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
export default LoginPage;
