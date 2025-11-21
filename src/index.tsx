import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';

type Bindings = {
	ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(jsxRenderer((props, c) => <Layout {...props} c={c} />));
app.use(trimTrailingSlash());

const getPage = (lang: 'en' | 'ja', page: string) => {
	return import(`./renderer/pages/${lang}/${page}`);
};

// --- Page Routes ---

// Root is the home page
app.get('/', (c) => {
	const lang = c.req.header('accept-language');
	if (lang?.includes('ja')) {
		return c.redirect('/ja');
	}
	return c.redirect('/en');
});

app.get('/:lang', async (c) => {
	const { lang } = c.req.param();
	if (lang === 'ja' || lang === 'en') {
		const { default: Page } = await getPage(lang, 'home.tsx');
		return c.render(<Page />);
	}
	return c.notFound();
});

// --- Dynamic Page Route ---
app.get('/:lang/:page', async (c) => {
	const { lang, page } = c.req.param();

	if (lang === 'ja' || lang === 'en') {
		try {
			const { default: Page } = await getPage(lang, `${page}.tsx`);
			return c.render(<Page />);
		} catch (e) {
			return c.notFound();
		}
	}

	return c.notFound();
});

// --- Static Asset Catcher ---
app.get('*', async (c) => {
	const res = await c.env.ASSETS.fetch(c.req.raw);
	if (res.status === 404) {
		return c.notFound();
	}
	return res;
});

// --- 404 Handler ---
app.notFound(async (c) => {
	const { default: NotFoundPage } = await import('./renderer/pages/404.tsx');
	c.status(404);
	return c.render(<NotFoundPage />);
});

export default app;
