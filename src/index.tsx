import { Hono } from 'hono';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { Layout } from './renderer/layout';
import { HomePage } from './renderer/pages/home';
import { NotFoundPage } from './renderer/pages/404';
import { jsxRenderer } from 'hono/jsx-renderer';

//import { postsPage } from './renderer/pages/posts'

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

/*app.get('/posts', async (c) => {
  try {
    const res = await fetch('https://dev.to/api/articles?username=nyanchu_okabe_b2a95eb4beb', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    if (!res.ok) {
      console.error(`API request failed with status: ${res.status}`);
      const errorText = await res.text();
      console.error(`API response: ${errorText}`);
      return c.render(<postsPage posts={[]} />)
    }
    const posts = await res.json()
    const simplified = posts.map((p: any) => ({
      title: p.title,
      url: p.url,
    }))
    return c.render(<postsPage posts={simplified} />)
  } catch (err) {
    console.error('Error fetching posts:', err);
    return c.render(<postsPage posts={[]} />)
  }
  })*/

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
