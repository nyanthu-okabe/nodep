import { Hono } from 'hono';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';
import { HomePage } from './renderer/pages/home';
import { NotFoundPage } from './renderer/pages/404';
import { jsxRenderer } from 'hono/jsx-renderer';

import { postsPage } from './renderer/pages/posts'

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

// データ取得関数
async function fetchTitles() {
  const res = await fetch('https://dev.to/api/articles?username=nyanchu_okabe_b2a95eb4beb')
  if (!res.ok) throw new Error('Failed to fetch posts')
  const posts = await res.json()
  return posts.map((p: any) => ({
    title: p.title,
    url: p.url
  }))
}

app.get('/posts', async (c) => {
  const res = await fetch('https://dev.to/api/articles?username=user123')
  const posts = await res.json()
  const simplified = posts.map((p: any) => ({
    title: p.title,
    url: p.url,
  }))
  return c.render(<postsPage posts={simplified} />)
})

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
