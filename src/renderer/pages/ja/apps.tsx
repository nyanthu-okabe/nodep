import type { FC } from 'hono/jsx';

const appsPage: FC = () => {
	return (
		<section id="apps">
			<p>ソフトウェアのダウンロードおよび管理ツール:</p>
			<p>- このアプリにはJVMが必要です。</p>
			<p>- macOS, Linux, Windowsをサポート</p>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
			<p>
				<strong>説明:</strong> プラットフォーム間でソフトウェアパッケージを簡単にダウンロードおよび管理するためのツールです。
			</p>
		</section>
	);
};
export default appsPage;
