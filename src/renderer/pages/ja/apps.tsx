import type { FC } from 'hono/jsx';

const appsPage: FC = () => {
	return (
		<section id="apps">
			<h2>App</h2>
			<h3>アプリケーションインストーラー</h3>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
			<p>
				<strong>説明:</strong>{' '}
				このアプリにはJVMが必要です。プラットフォーム間でソフトウェアパッケージを簡単にダウンロードおよび管理するためのツールです。
			</p>
			<h3>リリースされたアプリケーション</h3>
			<ul>
				<li>NGame</li>
			</ul>
		</section>
	);
};
export default appsPage;
