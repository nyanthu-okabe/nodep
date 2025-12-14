import type { FC } from 'hono/jsx';

const RegisterPage: FC = () => {
	return (
		<section id="register">
			<h3>ユーザー登録</h3>
			<form id="register-form" method="POST" action="/api/register">
				<p>
					<input type="text" name="username" placeholder="ユーザー名" required />
					<br />
					<input type="password" name="password" placeholder="パスワード (8文字以上)" required />
					<br />
					<br />
					<input type="submit" value="登録" />
				</p>
			</form>
			<div id="error-message" style="color: red;"></div>

		</section>
	);
};
export default RegisterPage;
