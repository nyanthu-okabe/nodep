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
			<link
				href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap&family=Pixelify+Sans&display=swap"
				rel="stylesheet"
			/>
			<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
			<link rel="stylesheet" href="/base.css" />
			<script src="/main.js"></script>
		</head>
		<body>
			<div className="container">
				<header className="hero-header">
			      <div className="hero-content">
			        <a href="/" style="all: unset; cursor: pointer; display: block" data-current="true" aria-current="page">
			          <div className="logo" style="display: flex; align-items: center; gap: 20px; font-family: 'Fira Sans', sans-serif; margin-bottom: 10px">
			            <img className="logo_img" src="/n.png" alt="Logo" style="height: 50px; width: 50px; object-fit: contain" />
			            <div style="text-align: left">
			              <h1 style="font-size: 36px; font-weight: 500; margin: 0; line-height: 1.1;">Nyanthu</h1>
			              <p style="margin: 0; font-weight: 200; font-size: 16px; color: #555;">
			                High quality applications and games at low cost
			              </p>
			            </div>
			          </div>
			        </a>
			      </div>
			    </header>
			    <header className="header-modern">
			      <div className="container">
			        <div className="nav-wrapper">
			          <input type="button" value="Home" data-target="" />
			          <input type="button" value="Sites" data-target="sites" />
			          <input type="button" value="Apps" data-target="apps" />
			          <input type="button" value="Docs" data-target="docs" />
			          <input type="button" value="Policy" data-target="policy" />
			          <input type="button" value="Bot" data-target="bot" />
					<input type="button" value="Bot" data-target="demo" />
			        </div>
			      </div>
			    </header>
				<div id="content">{props.children}</div>
				<footer>
					<p>© 2025 Nyanthu. All rights reserved.</p>
				</footer>
			</div>
		</body>
	</html>
);
