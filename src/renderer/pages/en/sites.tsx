import type { FC } from 'hono/jsx';

const sitesPage: FC = () => {
	return (
		<section id="sites">
			<strong>About me</strong>
			<div>
				<a href="https://github.com/nyanthu-okabe" target="_blank" rel="noopener">
					[GitHub]
				</a>
			</div>

			<strong>Large-scale Projects</strong>
			<div>
				<a href="#!"> [Thread](closed project) </a>
			</div>

			<strong>Medium-scale Projects</strong>
			<div>
				<a href="https://g.nyanthu.com" target="_blank" rel="noopener">
					[NetGames]
				</a>
			</div>
			<div>
				<a href="https://nyanthubot.nyanthu.com" target="_blank" rel="noopener">
					[Bot]
				</a>
			</div>
			<div>
				<a href="https://u.nyanthu.com" target="_blank" rel="noopener">
					[Utility]
				</a>
			</div>
		</section>
	);
};
export default sitesPage;
