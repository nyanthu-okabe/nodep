import { Hono } from 'hono';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';
import { HomePage } from './renderer/pages/home';
import { NotFoundPage } from './renderer/pages/404';
import { jsxRenderer } from 'hono/jsx-renderer';

// Define the bindings available to our worker
type Bindings = {
	ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(jsxRenderer(Layout));

// Middleware to remove trailing slashes from URLs
app.use(trimTrailingSlash());

// --- Page Routes ---

// Root is the home page
app.get('/', (c) => {
	return c.render(<HomePage />);
});

// --- Dynamic Page Route ---
app.get('/:page', async (c) => {
	const { page } = c.req.param();
	if (page.includes('.')) {
		return c.notFound();
	}

	try {
		const { [page + 'Page']: Page } = await import(`./renderer/pages/${page}.tsx`);
		if (Page) {
			return c.render(<Page />);
		}
	} catch (e) {
		// Fall through to notFound
	}

	return c.notFound();
});

// --- Static Asset Catcher ---
app.get('*', (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

// --- 404 Handler ---
app.notFound((c) => {
	c.status(404);
	return c.render(<NotFoundPage />);
});

export default app;
