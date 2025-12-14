import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';
import { getPage } from './utils/getPage';

import { cloudflareRateLimiter } from '@hono-rate-limiter/cloudflare';

type Bindings = {
	ASSETS: Fetcher;
	DB: D1Database;
	RATE_LIMITER: RateLimiter;
};

type Variables = {
	user: { id: number; username: string } | null;
	session: { id: string; user_id: number } | null;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Use the JSX renderer middleware to render JSX components.
app.use(jsxRenderer((props, honoContext) => <Layout {...props} honoContext={honoContext} />));
// Use the trim trailing slash middleware to remove trailing slashes from URLs.
app.use(trimTrailingSlash());

// --- Authentication ---

import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

// Helper functions for robust hex encoding
const encodeHex = (buffer: ArrayBuffer) => {
	return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
};
const decodeHex = (hex: string) => {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
	}
	return bytes.buffer;
};

const hashPassword = async (password: string, saltHex?: string) => {
	const salt = saltHex ? decodeHex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
	const passwordBuffer = new TextEncoder().encode(password);

	const combinedBuffer = new Uint8Array(salt.byteLength + passwordBuffer.length);
	combinedBuffer.set(new Uint8Array(salt), 0);
	combinedBuffer.set(passwordBuffer, salt.byteLength);

	const hashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);

	return {
		hash: encodeHex(hashBuffer),
		salt: encodeHex(salt),
	};
};

const verifyPassword = async (password: string, hash: string, salt: string) => {
	const { hash: hashedPassword } = await hashPassword(password, salt);
	return hashedPassword === hash;
};

// Session middleware
app.use('*', async (c, next) => {
	const sessionId = getCookie(c, 'session_id');
	if (!sessionId) {
		console.log('Session middleware: No session cookie found.');
		c.set('user', null);
		c.set('session', null);
		return next();
	}

	console.log(`Session middleware: Found session cookie: ${sessionId}`);

	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM sessions WHERE id = ? AND expires_at > ?')
			.bind(sessionId, Date.now())
			.all();

		const session = results[0] as { id: string; user_id: number } | undefined;

		if (!session) {
			console.log('Session middleware: Session not found in DB or expired.');
			c.set('user', null);
			c.set('session', null);
			deleteCookie(c, 'session_id');
			return next();
		}

		console.log(`Session middleware: Found session in DB for user_id: ${session.user_id}`);

		const { results: userResults } = await c.env.DB.prepare('SELECT id, username FROM users WHERE id = ?').bind(session.user_id).all();
		const user = userResults[0] as { id: number; username: string } | undefined;

		if (!user) {
			console.log(`Session middleware: User with id ${session.user_id} not found.`);
			c.set('user', null);
			c.set('session', null);
			deleteCookie(c, 'session_id');
			return next();
		}

		console.log(`Session middleware: Authenticated user: ${user.username}`);
		c.set('user', user);
		c.set('session', session);
	} catch (e: any) {
		console.error('Session middleware: Error fetching session or user.', e.message);
		c.set('user', null);
		c.set('session', null);
	}
	await next();
});


// API routes
const api = new Hono<{ Bindings: Bindings; Variables: Variables }>();
api.use(
	cloudflareRateLimiter({
		rateLimitBinding: (c) => c.env.RATE_LIMITER,
		keyGenerator: (c) => c.req.header('cf-connecting-ip') ?? 'ip',
	})
);

api.post('/register', async (c) => {
	console.log('API /register: Received request.');
	const contentType = c.req.header('content-type') || '';
	let body: any;
	if (contentType.includes('application/json')) {
		body = await c.req.json();
	} else if (contentType.includes('application/x-www-form-urlencoded')) {
		const text = await c.req.text();
		body = Object.fromEntries(new URLSearchParams(text));
	} else {
		try {
			body = await c.req.json();
		} catch (e) {
			const text = await c.req.text();
			body = Object.fromEntries(new URLSearchParams(text));
		}
	}
	const { username, password } = body;

	if (typeof username !== 'string' || typeof password !== 'string' || password.length < 8) {
		console.log('API /register: Invalid input.');
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
		const msg = lang === 'ja' ? '有効なユーザー名と、8文字以上のパスワードを入力してください。' : 'Please provide a valid username and a password with at least 8 characters.';
		return c.redirect(`/${lang}/register?error=${encodeURIComponent(msg)}`);
	}

	try {
		console.log(`API /register: Hashing password for user: ${username}`);
		const { hash, salt } = await hashPassword(password);

		console.log(`API /register: Inserting user ${username} into DB.`);
		const insertInfo = await c.env.DB.prepare('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)')
			.bind(username, hash, salt)
			.run();
		
		console.log('API /register: User inserted, info:', insertInfo);

		console.log(`API /register: Fetching newly created user: ${username}`);
		const user = await c.env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{id: number}>();
		
		if (!user) {
			console.error('API /register: CRITICAL - Just-inserted user not found.');
			throw new Error('Failed to retrieve user after creation.');
		}

		console.log(`API /register: Found user id: ${user.id}. Creating session.`);
		const sessionId = crypto.randomUUID();
		const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7-day session

		await c.env.DB.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
			.bind(sessionId, user.id, expires.getTime())
			.run();

		console.log(`API /register: Session created: ${sessionId}. Setting cookie.`);
		setCookie(c, 'session_id', sessionId, {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
			expires: expires,
			path: '/',
		});
		
		console.log('API /register: Registration successful.');
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try {
			const p = new URL(referer).pathname;
			const parts = p.split('/');
			if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1];
		} catch (e) {}
		return c.redirect(`/${lang}/apps`);

	} catch (e: any) {
		if (e.message?.includes('UNIQUE constraint failed')) {
			console.log(`API /register: Username ${username} already taken.`);
			const referer = c.req.header('referer') || c.req.header('referrer') || '';
			let lang = 'en';
			try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
			const msg = lang === 'ja' ? 'このユーザー名は既に使用されています。他の名前を選んでください。' : 'That username is already taken. Please choose another.';
			return c.redirect(`/${lang}/register?error=${encodeURIComponent(msg)}`);
		}
		console.error('API /register: An unexpected error occurred.', e);
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
		const msg = lang === 'ja' ? '予期しないエラーが発生しました。しばらくしてから再度お試しください。' : 'An unexpected error occurred. Please try again later.';
		return c.redirect(`/${lang}/register?error=${encodeURIComponent(msg)}`);
	}
});

api.post('/login', async (c) => {
	console.log('API /login: Received request.');
	const contentType = c.req.header('content-type') || '';
	let body: any;
	if (contentType.includes('application/json')) {
		body = await c.req.json();
	} else if (contentType.includes('application/x-www-form-urlencoded')) {
		const text = await c.req.text();
		body = Object.fromEntries(new URLSearchParams(text));
	} else {
		try {
			body = await c.req.json();
		} catch (e) {
			const text = await c.req.text();
			body = Object.fromEntries(new URLSearchParams(text));
		}
	}
	const { username, password } = body;

	if (typeof username !== 'string' || typeof password !== 'string') {
		console.log('API /login: Invalid input.');
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
		const msg = lang === 'ja' ? 'ユーザー名とパスワードを両方入力してください。' : 'Please provide both username and password.';
		return c.redirect(`/${lang}/login?error=${encodeURIComponent(msg)}`);
	}

	console.log(`API /login: Attempting to log in user: ${username}`);
	const user = await c.env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(username).first<{id: number; password: string; salt: string }>();

	if (!user) {
		console.log(`API /login: User not found: ${username}`);
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
		const msg = lang === 'ja' ? 'ユーザー名またはパスワードが正しくありません。' : 'Invalid username or password.';
		return c.redirect(`/${lang}/login?error=${encodeURIComponent(msg)}`);
	}

	console.log(`API /login: User found. Verifying password for: ${username}`);
	const validPassword = await verifyPassword(password, user.password, user.salt);

	if (!validPassword) {
		console.log(`API /login: Invalid password for user: ${username}`);
		const referer = c.req.header('referer') || c.req.header('referrer') || '';
		let lang = 'en';
		try { const p = new URL(referer).pathname; const parts = p.split('/'); if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1]; } catch (e) {}
		const msg = lang === 'ja' ? 'ユーザー名またはパスワードが正しくありません。' : 'Invalid username or password.';
		return c.redirect(`/${lang}/login?error=${encodeURIComponent(msg)}`);
	}

	console.log(`API /login: Password valid. Creating session for user id: ${user.id}`);
	const sessionId = crypto.randomUUID();
	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7-day session

	await c.env.DB.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
		.bind(sessionId, user.id, expires.getTime())
		.run();
	
	console.log(`API /login: Session created: ${sessionId}. Setting cookie.`);
	setCookie(c, 'session_id', sessionId, {
		httpOnly: true,
		secure: false,
		sameSite: 'Lax',
		expires: expires,
		path: '/',
	});
	
	console.log(`API /login: Login successful for user: ${username}`);
	const referer = c.req.header('referer') || c.req.header('referrer') || '';
	let lang = 'en';
	try {
		const p = new URL(referer).pathname;
		const parts = p.split('/');
		if (parts[1] === 'ja' || parts[1] === 'en') lang = parts[1];
	} catch (e) {}
	return c.redirect(`/${lang}/apps`);
});

api.post('/logout', async (c) => {
	console.log('API /logout: Received request.');
	const sessionId = getCookie(c, 'session_id');
	if (sessionId) {
		console.log(`API /logout: Deleting session: ${sessionId}`);
		await c.env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
	}
	console.log('API /logout: Deleting session cookie.');
	deleteCookie(c, 'session_id', { path: '/' });
	
	const lang = c.req.param('lang') || 'en';
	console.log(`API /logout: Redirecting to /${lang}/login.`);
	return c.redirect(`/${lang}/login`);
});

app.route('/api', api);

// --- Page Routes ---

// The root route redirects to the appropriate language based on the accept-language header.
app.get('/', (c) => {
	const lang = c.req.header('accept-language');
	if (lang?.includes('ja')) {
		return c.redirect('/ja');
	}
	return c.redirect('/en');
});

// The home page route for a specific language.
app.get('/:lang', async (c) => {
	const { lang } = c.req.param();
	if (lang === 'ja' || lang === 'en') {
		try {
			const { default: Page } = await getPage(lang, 'home');
			return c.render(<Page />);
		} catch (e) {
			// If the page is not found or an error occurs during rendering, return a 404 response.
			return c.notFound();
		}
	}
	return c.notFound();
});

// A dynamic page route that loads a page based on the language and page name.
app.get('/:lang/:page', async (c) => {
	const { lang, page } = c.req.param();
	const protectedPages = ['apps', 'sites', 'bot', 'docs'];

	if (page === 'logout') {
		return c.notFound();
	}

	if (protectedPages.includes(page)) {
		const user = c.get('user');
		if (!user) {
			return c.redirect(`/${lang}/login`);
		}
	}

	if (lang === 'ja' || lang === 'en') {
		try {
			const { default: Page } = await getPage(lang, page);
			return c.render(<Page />);
		} catch (e) {
			// If the page is not found, return a 404 response.
			return c.notFound();
		}
	}

	return c.notFound();
});

// --- Static Asset Catcher ---
// This route catches all other requests and serves them from the ASSETS binding.
app.get('*', async (c) => {
	const path = new URL(c.req.raw.url).pathname.slice(1);
	const res = await c.env.ASSETS.fetch(new Request(new URL(path, c.req.raw.url).toString(), c.req.raw));
	if (res.status === 404) {
		// If the asset is not found, return a 404 response.
		return c.notFound();
	}
	return res;
});

// --- 404 Handler ---
// This handler is called when no other route matches.
app.notFound(async (c) => {
	const { default: NotFoundPage } = await import('./renderer/pages/404.tsx');
	c.status(404);
	return c.render(<NotFoundPage />);
});

export default app;
