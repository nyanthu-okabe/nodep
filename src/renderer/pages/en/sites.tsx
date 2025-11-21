import type { FC } from 'hono/jsx';

const sitesPage: FC = () => {
	return (
		<section id="sites">
			<strong>About me</strong>
			<br />
			<a href="https://github.com/nyanthu-okabe" target="_blank" rel="noopener">
				{' '}
				[GitHub]{' '}
			</a>
			<br />

			<strong>Large-scale Projects</strong>
			<br />
			<a> [Thread](closed project) </a>
			<br />

			<strong>Medium-scale Projects</strong>
			<br />
			<a href="https://g.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[NetGames]{' '}
			</a>
			<br />
			<a href="https://nyanthubot.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[Bot]{' '}
			</a>
			<br />
			<a href="https://u.nyanthu.com" target="_blank" rel="noopener">
				{' '}
				[Utility]{' '}
			</a>
			<br />
		</section>
	);
};
export default sitesPage;
