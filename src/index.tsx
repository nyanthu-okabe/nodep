import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';

type Bindings = {
	ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// Use the JSX renderer middleware to render JSX components.
app.use(jsxRenderer((props, honoContext) => <Layout {...props} honoContext={honoContext} />));
// Use the trim trailing slash middleware to remove trailing slashes from URLs.
app.use(trimTrailingSlash());

/**
 * Dynamically imports a page component based on the language and page name.
 *
 * @param lang The language of the page.
 * @param page The name of the page.
 * @returns A promise that resolves to the page component.
 */
const getPage = (lang: 'en' | 'ja', page: string) => {
	return import(`./renderer/pages/${lang}/${page}`);
};

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
			const { default: Page } = await getPage(lang, 'home.tsx');
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

	if (lang === 'ja' || lang === 'en') {
		try {
			const { default: Page } = await getPage(lang, `${page}.tsx`);
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
	const path = c.req.raw.url.pathname.slice(1);
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
