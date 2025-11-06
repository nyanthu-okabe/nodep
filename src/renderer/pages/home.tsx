import type { FC } from 'hono/jsx';

export const HomePage: FC = () => {
	return (
		<section id="home">
			<h2>Home</h2>
			<p>
				<em>"Providing interaction and happiness across borders."</em>
			</p>

			<input type="button" value="Donate to Nyanthu" data-target="donate" className="donateBtn" />
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
