import type { FC } from 'hono/jsx';

const LoginPage: FC = () => {
	return (
		<section id="login">
			<h3>ログイン</h3>
			<form id="login-form" method="POST" action="/api/login">
				<p>
					<input type="text" name="username" placeholder="ユーザー名" required />
					<br />
					<input type="password" name="password" placeholder="パスワード" required />
					<br />
					<br />
					<input type="submit" value="ログイン" />
				</p>
			</form>
			<div id="error-message" style="color: red;"></div>

		</section>
	);
};
export default LoginPage;
