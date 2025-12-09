import type { FC } from 'hono/jsx';

const registerPage: FC = () => {
	return (
		<section id="register">
			<h2>Register</h2>
			<form>
				<p>
					<input type="text" name="username" placeholder="Username" required />
					<br />
					<input type="email" name="email" placeholder="Email" required />
					<br />
					<input type="password" name="password" placeholder="Password" required />
					<br />
					<input type="checkbox" name="terms" required /> <a href="/en/policy">利用規約</a>に同意する
					<br />
					<br />
					<input type="submit" value="Register" />
				</p>
			</form>
		</section>
	);
};
export default registerPage;
