import type { FC } from 'hono/jsx';

const LoginPage: FC = () => {
	return (
		<section id="login">
			<h3>Login</h3>
			<form id="login-form" method="POST" action="/api/login">
				<p>
					<input type="text" name="username" placeholder="Username" required />
					<br />
					<input type="password" name="password" placeholder="Password" required />
					<br />
					<br />
					<input type="submit" value="Login" />
				</p>
			</form>
			<div id="error-message" style="color: red;"></div>

		</section>
	);
};
export default LoginPage;
