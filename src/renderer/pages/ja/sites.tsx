import type { FC } from 'hono/jsx';

const sitesPage: FC = () => {
	return (
		<section id="sites">
			<strong>私について</strong>
			<br />
			<a href="https://github.com/nyanthu-okabe" target="_blank" rel="noopener">
				{' '}
				[GitHub]{' '}
			</a>
			<br />

			<strong>大規模プロジェクト</strong>
			<br />
			<a> [スレッド](非公開プロジェクト) </a>
			<br />

			<strong>中規模プロジェクト</strong>
			<br />
			<a href="https://g.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[ネットゲーム]{' '}
			</a>
			<br />
			<a href="https://nyanthubot.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[ボット]{' '}
			</a>
			<br />
			<a href="https://u.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[ユーティリティ]{' '}
			</a>
			<br />
		</section>
	);
};
export default sitesPage;
