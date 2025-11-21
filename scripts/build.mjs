import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['public/v2.js'],
	outdir: 'public/dist',
	minify: true,
});

esbuild.build({
	entryPoints: ['public/base.css'],
	outdir: 'public/dist',
	minify: true,
});
