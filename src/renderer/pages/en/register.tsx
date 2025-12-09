import type { FC } from 'hono/jsx';

const registerPage: FC = () => {
	return (
		<section id="register">
			<h3>Register</h3>
			<form>
				<p>
					<input type="text" name="username" placeholder="Username" required />
					<br />
					<input type="email" name="email" placeholder="Email" required />
					<br />
					<input type="password" name="password" placeholder="Password" required />
					<br />
					<input type="checkbox" name="terms" required /> I agree to the <a href="/en/policy">policy</a> and conditions. <br />
					<br />
					<br />
					<input type="submit" value="Register" />
				</p>
			</form>
		</section>
	);
};
export default registerPage;
