import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`""`);
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`
			"<!DOCTYPE html><html lang="en"><head><title>Nyanthu | Software &amp; Game Development Studio</title><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="keywords" content="Nyanthu, Software Developer, Game Development, BGFX, Godot, Tools, Open Source, Japan"/><meta property="og:title" content="Nyanthu | Software &amp; Game Developer"/><meta property="og:description" content="Nyanthu is a software development group creating tools, games, and experimental technologies."/><meta property="og:type" content="website"/><meta property="og:url" content="https://www.nyanthu.com/en"/><meta property="og:image" content="/favicon2.png"/><meta property="og:locale" content="en_US"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="Nyanthu | Software &amp; Game Developer"/><meta name="twitter:description" content="We create interactive software and games for everyone."/><meta name="twitter:image" content="/favicon2.png"/><link rel="canonical" href="https://www.nyanthu.com/en"/><link rel="icon" type="image/png" href="/favicon2.png?v=2"/><meta name="description" content="Nyanthu is a development group creating innovative software, games, and tools."/><link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet"/><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script><link rel="stylesheet" href="/static-assets/base.css"/><style>
								.logout-button {
									background: none;
									border: none;
									cursor: pointer;
									color: var(--muted);
									font-size: 0.95rem;
									text-decoration: none;
									opacity: 0.8;
									transition: 0.15s;
									padding: 0;
									font-family: inherit;
								}
								.logout-button:hover {
									color: var(--text);
									opacity: 1;
								}
							</style></head><body><div class="loading-indicator"></div><header class="navbar"><div class="nav-inner"><a href="/en" class="nav-title"><div class="nav-left"><img src="/favicon2.png" class="nav-logo-img" alt="Logo"/>Nyanthu</div></a><nav class="nav-links"><a href="/en/">Home</a><a href="/en/sites">Sites</a><a href="/en/apps">Apps</a><a href="/en/docs">Docs</a><a href="/en/policy">Policy</a><a href="/en/bot">Bot</a><a href="/en/login">Login</a><a href="/en/register">Register</a></nav></div></header><main id="content"><section id="home"><section class="hero"><canvas id="cobe"></canvas><h1 style="color: #333333">Maximize comfort and speed</h1><p style="color: #555555">Fast and good usability, no matter how low the client specs</p><a href="/demo" class="btn">View Demo</a><a href="mailto:contact@nyanthu.com" class="btn2">Contact</a></section><p><em>&quot;Providing interaction and happiness across borders.&quot;</em></p><ul><li>Carefully bluesheet</li><li>Fastest run time</li><li>Latest technologies</li><li>Simple UI</li></ul><p>Contact: <a href="mailto:contact@nyanthu.com">contact@nyanthu.com</a></p><p>Contact, Support &amp; Requirements Form: <a href="https://padlet.com/nyanthu/submission-request/axjQb8lJ0NEWbgYo">PostForm</a></p><p>Nyanthu is a software development group experienced in technologies ranging from low-level BGFX and C++ to Godot and 3D development.</p><p><strong>Terms of Use:</strong> Provided by Nyanthu. Use at your own risk. Copying or redistribution is prohibited. All rights reserved.</p><pre><code class="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code></pre></section></main><footer><p>© 2025 Nyanthu. All rights reserved.</p></footer></body><script type="module" src="/static-assets/v2.js"></script></html>"
		`);
	});
});
