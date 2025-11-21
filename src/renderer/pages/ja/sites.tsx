import type { FC } from 'hono/jsx';

const sitesPage: FC = () => {
	return (
		<section id="sites">
			<strong>私について</strong>
			<div>
				<a href="https://github.com/nyanthu-okabe" target="_blank" rel="noopener">
					[GitHub]
				</a>
			</div>

			<strong>大規模プロジェクト</strong>
			<div>
				<a href="#!"> [スレッド](非公開プロジェクト) </a>
			</div>

			<strong>中規模プロジェクト</strong>
			<div>
				<a href="https://g.nyanthu.com" target="_blank" rel="noopener">
					[ネットゲーム]
				</a>
			</div>
			<div>
				<a href="https://nyanthubot.nyanthu.com" target="_blank" rel="noopener">
					[ボット]
				</a>
			</div>
			<div>
				<a href="https://u.nyanthu.com" target="_blank" rel="noopener">
					[ユーティリティ]
				</a>
			</div>
		</section>
	);
};
export default sitesPage;
