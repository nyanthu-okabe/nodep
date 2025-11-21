import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['public/v2.js'],
	outdir: 'public/static-assets',
	minify: true,
});

esbuild.build({
	entryPoints: ['public/base.css'],
	outdir: 'public/static-assets',
	minify: true,
});
