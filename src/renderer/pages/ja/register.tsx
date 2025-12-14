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
			<script>{`(function(){
				try{
					const p = new URLSearchParams(location.search);
					const err = p.get('error');
					if(err){
						const el = document.getElementById('error-message');
						if(el) el.textContent = decodeURIComponent(err);
					}
					const user = document.querySelector('input[name="username"]');
					if(user) (user as HTMLInputElement).focus();
				}catch(e){}
			})();`}</script>

		</section>
	);
};
export default RegisterPage;
