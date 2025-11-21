import type { FC } from 'hono/jsx';

const demoPage: FC = () => {
	return (
		<section id="demo">
			<style>
				{`
          h2 {
            cursor: url(./pointer.png) 16 16, auto;
          }
        `}
			</style>
			<p>
				<em>"デモはオープンソースです。GitHubでプロジェクトに貢献できます。"</em>
			</p>

			<iframe
				src="https://turbowarp.org/1237585767/embed?ui=false&autostart=true"
				width="482"
				height="412"
				allowFullScreen
				style={{ colorScheme: 'auto' }}
				title="ターボワープ埋め込み"
			></iframe>

			<p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
		</section>
	);
};
export default demoPage;
