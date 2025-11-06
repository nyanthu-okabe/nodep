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
		</head>
		<body>
			<div className="container">
				<div className="header">
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					<a href="/" style={{all: 'unset', cursor: 'pointer', display: 'block'}} data-current="true" aria-current="page">
						<div
							className="logo"
							style={{display: 'flex', alignItems: 'center', gap: '20px', fontFamily: "'Fira Sans', sans-serif", marginBottom: '10px'}}
						>
							<img
								className="logo_img"
								src="/n.png?__frsh_c=4ee4ac658a2a88e82077a949015afccbeb6e620d"
								alt="Logo"
								style={{height: '50px', width: '50px', border: '0px', objectFit: 'contain'}}
							/>
							<div>
								<h1 style={{fontSize: '36px', fontWeight: '500', margin: '0', lineHeight: '1.1'}}>Nyanthu</h1>
								<p style={{margin: '0px 0 0 0', fontWeight: '200', fontSize: '16px', color: '#555'}}>
									High quality applications and games at low cost
								</p>
							</div>
						</div>
					</a>
					<div className="header-buttons" role="navigation" aria-label="main navigation">
						<a href="/"><input type="button" value="Home" /></a>
						<a href="/sites"><input type="button" value="Sites" /></a>
						<a href="/apps"><input type="button" value="Apps" /></a>
						<a href="/docs"><input type="button" value="Docs" /></a>
						<a href="/policy"><input type="button" value="Policy" /></a>
						<a href="/bot"><input type="button" value="Bot" /></a>
						<a href="/demo"><input type="button" style={{border: '1px solid #4b5eaa'}} value="Demo" /></a>
					</div>
				</div>
				<div id="content">{props.children}</div>
				<footer>
					<p>© 2025 Nyanthu. All rights reserved.</p>
				</footer>
			</div>
		</body>
	</html>
);
