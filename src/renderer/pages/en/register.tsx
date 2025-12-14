import type { FC } from 'hono/jsx';

const RegisterPage: FC = () => {
	return (
		<section id="register">
			<h3>Register</h3>
			<form id="register-form" method="POST" action="/api/register">
				<p>
					<input type="text" name="username" placeholder="Username" required />
					<br />
					<input type="password" name="password" placeholder="Password (min. 8 characters)" required />
					<br />
					<br />
					<input type="submit" value="Register" />
				</p>
			</form>
			<div id="error-message" style="color: red;"></div>

		</section>
	);
};
export default RegisterPage;
