import type { FC } from 'hono/jsx';

const logoutPage: FC = () => {
	return (
		<section id="logout">
			<h3>Logout</h3>
			<input type="submit" value="Logout" />
		</section>
	);
};
export default logoutPage;
