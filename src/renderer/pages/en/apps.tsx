import type { FC } from 'hono/jsx';

const appsPage: FC = () => {
	return (
		<section id="apps">
			<h2>Application</h2>
			<h3>Application Installer</h3>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
			<p>
				<strong>Description:</strong>The app requires the JVM. A tool for downloading and managing software packages easily across
				platforms.
			</p>
			<h3>Relesed Application</h3>
			<ul>
				<li>NGame</li>
			</ul>
		</section>
	);
};
export default appsPage;
