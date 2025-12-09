import type { FC } from 'hono/jsx';

const loginPage: FC = () => {
	return (
		<section id="login">
			<h3>Login</h3>
			<form>
				<p>
					<input type="email" name="email" placeholder="Email" required />
					<br />
					<input type="password" name="password" placeholder="Password" required />
					<br />
					<br />
					<input type="submit" value="Login" />
				</p>
			</form>
		</section>
	);
};
export default loginPage;
