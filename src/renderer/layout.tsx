import type { FC } from 'hono/jsx';
import { HonoRequest } from 'hono';

type Props = {
	c: {
		req: HonoRequest;
	};
	children: any;
};

const text = {
	en: {
		title: 'Nyanthu | Software & Game Development Studio',
		description: 'Nyanthu is a development group creating innovative software, games, and tools.',
		og_title: 'Nyanthu | Software & Game Developer',
		og_description: 'Nyanthu is a software development group creating tools, games, and experimental technologies.',
		twitter_title: 'Nyanthu | Software & Game Developer',
		twitter_description: 'We create interactive software and games for everyone.',
		keywords: 'Nyanthu, Software Developer, Game Development, BGFX, Godot, Tools, Open Source, Japan',
		home: 'Home',
		sites: 'Sites',
		apps: 'Apps',
		docs: 'Docs',
		policy: 'Policy',
		bot: 'Bot',
		copyright: '© 2025 Nyanthu. All rights reserved.',
	},
	ja: {
		title: 'Nyanthu | ソフトウェア＆ゲーム開発スタジオ',
		description: 'Nyanthuは、革新的なソフトウェア、ゲーム、ツールを制作する開発グループです。',
		og_title: 'Nyanthu | ソフトウェア＆ゲーム開発者',
		og_description: 'Nyanthuは、ツール、ゲーム、実験的な技術を創造するソフトウェア開発グループです。',
		twitter_title: 'Nyanthu | ソフトウェア＆ゲーム開発者',
		twitter_description: '私たちは、すべての人のためのインタラクティブなソフトウェアとゲームを創造します。',
		keywords: 'Nyanthu, ソフトウェア開発, ゲーム開発, BGFX, Godot, ツール, オープンソース, 日本',
		copyright: '© 2025 Nyanthu. 無断複写・転載を禁じます。',
	},
};

export const Layout: FC<Props> = (props) => {
	const lang = props.c.req.param('lang') === 'ja' ? 'ja' : 'en';
	const t = text[lang];
	const langPrefix = lang === 'en' ? '' : `/${lang}`;

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

				<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
				<link rel="stylesheet" href="/dist/base.css" />
			</head>

			<body>
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
							<a href={`/${lang}`} data-target={``}>Home</a>
							<a href={`/${lang}/sites`} data-target={`sites`}>Sites</a>
							<a href={`/${lang}/apps`} data-target={`apps`}>Apps</a>
							<a href={`/${lang}/docs`} data-target={`docs`}>Docs</a>
							<a href={`/${lang}/policy`} data-target={`policy`}>Policy</a>
							<a href={`/${lang}/bot`} data-target={`bot`}>Bot</a>
						</nav>
					</div>
				</header>

				<main id="content">{props.children}</main>

				<footer>
					<p>{t.copyright}</p>
				</footer>
			</body>
			<script type="module" src="/dist/v2.js"></script>
		</html>
	);
};
