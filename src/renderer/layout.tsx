import type { FC } from 'hono/jsx';

export const Layout: FC = (props) => (
	<html lang="en">
		<head>
			<title>Nyanthu | Software & Game Development Studio</title>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="keywords" content="Nyanthu, Software Developer, Game Development, BGFX, Godot, Tools, Open Source, Japan" />
			<meta property="og:title" content="Nyanthu | Software & Game Developer" />
			<meta
				property="og:description"
				content="Nyanthu is a software development group creating tools, games, and experimental technologies."
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://www.nyanthu.com/" />
			<meta property="og:image" content="/favicon2.png" />
			<meta property="og:locale" content="en_US" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Nyanthu | Software & Game Developer" />
			<meta name="twitter:description" content="We create interactive software and games for everyone." />
			<meta name="twitter:image" content="/favicon2.png" />
			<link rel="canonical" href="https://www.nyanthu.com/" />
			<link rel="icon" type="image/png" href="/favicon2.png?v=2" />
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon2.png?v=2" />
			<meta name="description" content="Nyanthu is a development group creating innovative software, games, and tools." />

			<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
			<link rel="stylesheet" href="/base.css" />
		</head>

		<body>
			<header class="navbar">
				<div class="nav-inner">
					<a href="/" class="nav-title" data-target="">
						<div class="nav-left">
							<img src="/favicon2.png" class="nav-logo-img" alt="Logo" />
							Nyanthu
						</div>
					</a>
<nav class="nav-links">
    <a href="/" data-target="">Home</a>
    <a href="/sites" data-target="sites">Sites</a>
    <a href="/apps" data-target="apps">Apps</a>
    <a href="/docs" data-target="docs">Docs</a>
    <a href="/policy" data-target="policy">Policy</a>
    <a href="/bot" data-target="bot">Bot</a>
</nav>

				</div>
			</header>

			<main id="content">{props.children}</main>

			<footer>
				<p>© 2025 Nyanthu. All rights reserved.</p>
			</footer>
		</body>
		<script
			dangerouslySetInnerHTML={{
				__html: `
					document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('[data-target]');
    const content = document.getElementById('content');

    function updateNav(target) {
        links.forEach(link => {
            if (link.getAttribute('data-target') === target) {
                link.setAttribute('data-current', 'true');
            } else {
                link.removeAttribute('data-current');
            }
        });
    }

    function loadPage(target) {
        const url = target === '' ? '/' : '/' + target;
        fetch(url)
            .then(r => r.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('#content').innerHTML;
                content.innerHTML = newContent;
                history.pushState({ target }, '', url);
                updateNav(target);
                Prism.highlightAll();
            });
    }

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // ← a のページ遷移を阻止
            const target = this.getAttribute('data-target');
            loadPage(target);
        });
    });

    window.addEventListener('popstate', event => {
        const target = event.state?.target ?? '';
        loadPage(target);
    });

    updateNav(window.location.pathname.substring(1));
});`,
			}}
		/>
	</html>
);
