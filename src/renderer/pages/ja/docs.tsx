import type { FC } from 'hono/jsx';

const docsPage: FC = () => {
	return (
		<section id="docs">
			<details>
				<summary>nyanthu - 管理者</summary>
				<p style={{ color: 'gray' }}>
					<strong style={{ color: 'black' }}>nyanchu okabe</strong> - CEO / 管理者
				</p>
				<p>3D C++ 開発者</p>
			</details>

			<details>
				<summary>スナップショット</summary>
				<p>1.01v - NyanthuGame</p>
				<img src="/app_sc.png" style={{ height: '200px', width: 'auto' }} />
			</details>
			<details>
				<summary>Pkgm セットアップ</summary>
				<p>
					pkgm をダウンロードしてインストールします:
					<code>curl https://www.nyanthu.com/pkgm.sh | sh</code>
				</p>
			</details>
			<details>
				<summary>スタジオについて</summary>
				<div style={{ display: 'flex' }}>
					<img src="/favicon2.png" style={{ height: '100px', width: 'auto' }} />
					<p>
						<strong>NyanthuStudio</strong>
						<br />

						<a href="mailto:nyanthu@email.com">nyanthu@email.com</a>
						<br />
						<a href="https://discord.gg/yG7sVGdgUX">Discord</a>
						<br />
						<a href="https://nyanthubot.nyanthu.com">ボットに質問</a>
					</p>
				</div>
				<p>
					2025年8月に設立されたスタジオで、究極の安定性とパフォーマンスを追求し、クリックからゲームプレイ完了までのあらゆるミリ秒を高速化することを目指しています。
				</p>
			</details>
		</section>
	);
};
export default docsPage;
