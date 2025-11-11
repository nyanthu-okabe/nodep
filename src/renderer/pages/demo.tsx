import type { FC } from 'hono/jsx';

export const demoPage: FC = () => {
	return (
		<section id="demo">
			<style>
				{`
          h2 {
            cursor: url(./pointer.png) 16 16, auto;
          }
        `}
			</style>
			<p>
				<em>"Demo is open source. You can contribute to the project on GitHub."</em>
			</p>

			<iframe
				src="https://turbowarp.org/1237585767/embed?ui=false&autostart=true"
				width="482"
				height="412"
				allowFullScreen
				style={{ colorScheme: 'auto' }}
				title="turbowarp-embed"
			></iframe>

			<p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
		</section>
	);
};
