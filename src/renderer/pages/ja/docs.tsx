import type { FC } from 'hono/jsx';

const docsPage: FC = () => {
	return (
		<section id="docs">
			<h2>Docs</h2>
			<strong>Pages</strong>
			<ul>
				<li>Admin</li>
			</ul>
			<details>
				<summary>Admin</summary>
				<p style={{ color: 'gray' }}>
					<strong style={{ color: 'black' }}>nyanchu okabe</strong> - CEO / Admin
				</p>
				<p>3D C++ Developer</p>
			</details>
		</section>
	);
};
export default docsPage;
