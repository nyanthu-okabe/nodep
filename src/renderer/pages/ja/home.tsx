import type { FC } from 'hono/jsx';

const HomePage: FC = () => {
	return (
		<section id="home">
			<section class="hero">
				<h1 style="color: #eeeeee">快適さと速さを最大化</h1>
				<p style="color: #dddddd">クライアントのスペックがどんなに低くても、高速で優れたユーザビリティを</p>
				<a href="/demo" class="btn">
					デモを見る
				</a>
			</section>
			<p>
				<em>「国境を越えて交流と幸せを提供する。」</em>
			</p>
			<p>
				連絡先: <a href="mailto:contact@nyanthu.com">contact@nyanthu.com</a>
			</p>
			<p>
				お問い合わせ、サポート、要件フォーム: <a href="https://padlet.com/nyanthu/submission-request/axjQb8lJ0NEWbgYo">投稿フォーム</a>
			</p>
			<p>
				Nyanthuは、低レベルのBGFXやC++からGodotや3D開発に至るまでの技術に精通したソフトウェア開発グループです。
			</p>
			<p>
				<strong>利用規約:</strong> Nyanthuによって提供されています。自己責任でご利用ください。コピーまたは再配布は禁止されています。無断複写・転載を禁じます。
			</p>
			<pre>
				<code className="language-bash">curl https://www.nyanthu.com/pkgm.sh | sh</code>
			</pre>
		</section>
	);
};
export default HomePage;
