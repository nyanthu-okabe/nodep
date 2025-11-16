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
					<a href="/" class="nav-title" style="text-decoration: none;">
						<div class="nav-left">
							<img src="/favicon2.png" class="nav-logo-img" alt="Logo" />
							Nyanthu
						</div>
					</a>
					<nav class="nav-links">
						<input type="button" value="Home" data-target="" />
						<input type="button" value="Sites" data-target="sites" />
						<input type="button" value="Apps" data-target="apps" />
						<input type="button" value="Docs" data-target="docs" />
						<input type="button" value="Policy" data-target="policy" />
						<input type="button" value="Bot" data-target="bot" />
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
									const buttons = document.querySelectorAll('[data-target]');
									const content = document.getElementById('content');

									function updateNav(target) {
										buttons.forEach(button => {
											if (button.getAttribute('data-target') === target) {
												button.setAttribute('data-current', 'true');
											} else {
												button.removeAttribute('data-current');
											}
										});
									}

									function loadPage(target) {
										const url = target === '' ? '/' : '/' + target;
										fetch(url)
											.then((response) => response.text())
											.then((html) => {
												const parser = new DOMParser();
												const doc = parser.parseFromString(html, 'text/html');
												const newContent = doc.querySelector('#content').innerHTML;
												content.innerHTML = newContent;
												history.pushState({ target: target }, '', url);
												updateNav(target);
												Prism.highlightAll();
											});
									}

									buttons.forEach((button) => {
										button.addEventListener('click', function () {
											const target = this.getAttribute('data-target');
											loadPage(target);
										});
									});

									window.addEventListener('popstate', function (event) {
										const target = (event.state && event.state.target) ? event.state.target : '';
										loadPage(target);
									});

									// Set initial state
									const initialTarget = window.location.pathname.substring(1);
									updateNav(initialTarget);
								});`,
			}}
		/>
	</html>
);
