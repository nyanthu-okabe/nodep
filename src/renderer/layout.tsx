import { HonoRequest } from 'hono';
import { FC } from 'hono/jsx';
import { Context } from 'hono';
import en from '../lang/en.json';
import ja from '../lang/ja.json';
import { nav } from '../config/nav';
import { asset } from '../config/asset';

type LayoutProps = {
	honoContext: Context<{ Variables: { user: { id: number; username: string } | null } }>;
	children: any;
};

// The translations for the different languages.
const text = {
	en,
	ja,
};

/**
 * The main layout component for the application.
 *
 * @param props The properties for the component.
 * @returns The rendered layout.
 */
export const Layout: FC<LayoutProps> = (props) => {
	// Determine the language from the request parameter.
	const lang = props.honoContext.req.param('lang') === 'ja' ? 'ja' : 'en';
	// Get the translations for the current language.
	const t = text[lang];
	// Create the language prefix for the URLs.
	const langPrefix = `/${lang}`;
	// Get user from context
	const user = props.honoContext.get('user');

	return (
		<html lang={lang}>
			<head>
				<title>{t.title}</title>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="keywords" content={t.keywords} />
				<meta property="og:title" content={t.og_title} />
				<meta property="og:description" content={t.og_description} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://www.nyanthu.com${langPrefix}`} />
				<meta property="og:image" content="/favicon2.png" />
				<meta property="og:locale" content={lang === 'ja' ? 'ja_JP' : 'en_US'} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={t.twitter_title} />
				<meta name="twitter:description" content={t.twitter_description} />
				<meta name="twitter:image" content="/favicon2.png" />
				<link rel="canonical" href={`https://www.nyanthu.com${langPrefix}`} />
				<link rel="icon" type="image/png" href="/favicon2.png?v=2" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon2.png?v=2" />
				<meta name="description" content={t.description} />

				{/* Prism CSS for syntax highlighting */}
				<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
				{/* Prism JS */}
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
				{/* Prism copy to clipboard plugin */}
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
				{/* Prism bash language component */}
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
				{/* The main stylesheet for the application. */}
				<link rel="stylesheet" href={asset.css} />
				<style>{`
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
				`}</style>
			</head>

			<body>
				{/* The loading indicator for client-side navigation. */}
				<div class="loading-indicator"></div>
				<header class="navbar">
					<div class="nav-inner">
						<a href={`/${lang}`} class="nav-title">
							<div class="nav-left">
								<img src="/favicon2.png" class="nav-logo-img" alt="Logo" />
								Nyanthu
							</div>
						</a>
						<nav class="nav-links">
							{/* Dynamically generate the navigation links from the configuration. */}
							{nav.map((item) => (
								<a href={`${langPrefix}${item.path}`}>{t[item.name]}</a>
							))}
							{user ? (
								<>
									<span>Welcome, {user.username}!</span>
									<form action="/api/logout" method="post" style="display: inline;">
										<button type="submit" class="logout-button">
											Logout
										</button>
									</form>
								</>
							) : (
								<>
									<a href={`${langPrefix}/login`}>Login</a>
									<a href={`${langPrefix}/register`}>Register</a>
								</>
							)}
						</nav>
					</div>
				</header>

				<main id="content">{props.children}</main>

				<footer>
					<p>{t.copyright}</p>
				</footer>
			</body>
			{/* The client-side navigation script. */}
			<script type="module" src={asset.js}></script>
		</html>
	);
};
