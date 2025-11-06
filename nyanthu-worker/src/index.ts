import { Hono } from 'hono';
import { trimTrailingSlash } from 'hono/trailing-slash';

// Define the bindings available to our worker
type Bindings = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware to remove trailing slashes from URLs
app.use(trimTrailingSlash());

/**
 * Renders a page by fetching the base template and page-specific content
 * from the ASSETS binding, then injecting the content into the template.
 */
const renderPage = async (c: any, pageName: string) => {
    try {
        const [baseRes, contentRes] = await Promise.all([
            c.env.ASSETS.fetch(new Request(new URL('/base.html', c.req.url))),
            c.env.ASSETS.fetch(new Request(new URL(`/pages/${pageName}.html`, c.req.url)))
        ]);

        if (contentRes.status === 404) {
            return c.notFound();
        }

        if (baseRes.ok && contentRes.ok) {
            const baseHtml = await baseRes.text();
            const contentHtml = await contentRes.text();
            const finalHtml = baseHtml.replace('<!--CONTENT-->', contentHtml);
            return c.html(finalHtml);
        }
    } catch (e) {
        console.error(`Error rendering page ${pageName}:`, e);
    }
    return c.notFound();
};

// --- Page Routes ---

// Root is the home page
app.get('/', (c) => renderPage(c, 'home'));

// --- Redirects for old/alias URLs ---
app.get('/home', (c) => c.redirect('/', 301));
app.get('/chatbot', (c) => c.redirect('/bot', 301));

// --- Dynamic Page Route ---
app.get('/:page', (c) => {
    const { page } = c.req.param();
    if (page.includes('.')) {
        return c.notFound();
    }
    return renderPage(c, page);
});

// --- Static Asset Catcher ---
app.get('*', async (c) => {
    try {
        const res = await c.env.ASSETS.fetch(c.req.raw);
        if (res.ok) {
            return res;
        }
    } catch (e) {
        console.error(`Error fetching asset ${c.req.url}:`, e);
    }
    return c.notFound();
});

// --- 404 Handler ---
// This handler is triggered when c.notFound() is called or no route matches.
app.notFound(async (c) => {
    try {
        const [baseRes, contentRes] = await Promise.all([
            c.env.ASSETS.fetch(new Request(new URL('/base.html', c.req.url))),
            c.env.ASSETS.fetch(new Request(new URL('/pages/404.html', c.req.url)))
        ]);

        if (baseRes.ok && contentRes.ok) {
            const baseHtml = await baseRes.text();
            const contentHtml = await contentRes.text();
            const finalHtml = baseHtml.replace('<!--CONTENT-->', contentHtml);
            return c.html(finalHtml, 404);
        }
    } catch (e) {
        console.error("Error rendering 404 page:", e);
    }
    // Fallback if custom 404 page fails
    return c.text('Not Found', 404);
});


export default app;