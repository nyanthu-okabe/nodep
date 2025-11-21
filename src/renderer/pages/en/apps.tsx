import type { FC } from 'hono/jsx';

const appsPage: FC = () => {
	return (
		<section id="apps">
			<p>Software download and management tool:</p>
			<p>- The app requires the JVM.</p>
			<p>- Supports macOS, Linux, Windows</p>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
			<p>
				<strong>Description:</strong> A tool for downloading and managing software packages easily across platforms.
			</p>
		</section>
	);
};
export default appsPage;
