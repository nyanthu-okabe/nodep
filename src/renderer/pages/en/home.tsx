import type { FC } from 'hono/jsx';

const HomePage: FC = () => {
	return (
		<section id="home">
			<section class="hero">
				<canvas id="cobe"></canvas>
				<h1 style="color: #333333">Maximize comfort and speed</h1>
				<p style="color: #555555">Fast and good usability, no matter how low the client specs</p>
				<a href="/demo" class="btn">
					View Demo
				</a>
				<a href="mailto:contact@nyanthu.com" class="btn2">
					Contact
				</a>
			</section>
			<p>
				<em>"Providing interaction and happiness across borders."</em>
			</p>
			<p>
				Contact: <a href="mailto:contact@nyanthu.com">contact@nyanthu.com</a>
			</p>
			<p>
				Contact, Support & Requirements Form: <a href="https://padlet.com/nyanthu/submission-request/axjQb8lJ0NEWbgYo">PostForm</a>
			</p>
			<p>
				Nyanthu is a software development group experienced in technologies ranging from low-level BGFX and C++ to Godot and 3D development.
			</p>
			<p>
				<strong>Terms of Use:</strong> Provided by Nyanthu. Use at your own risk. Copying or redistribution is prohibited. All rights
				reserved.
			</p>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
		</section>
	);
};
export default HomePage;
