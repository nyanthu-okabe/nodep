'use strict';
document.addEventListener('DOMContentLoaded', function () {
	const i = document.getElementById('content'),
		o = document.documentElement.lang,
		s = o === 'en' ? '' : '/' + o;
	function r(e) {
		document.querySelectorAll('header nav a').forEach((t) => {
			t.getAttribute('href') === e ? t.setAttribute('data-current', 'true') : t.removeAttribute('data-current');
		});
	}
	function a(e, n = !0) {
		(document.body.classList.add('loading'),
			fetch(e)
				.then((t) => {
					if (!t.ok) throw new Error(`Failed to fetch page: ${t.status} ${t.statusText}`);
					return t.text();
				})
				.then((t) => {
					const c = new DOMParser().parseFromString(t, 'text/html').querySelector('#content');
					if (c)
						((i.innerHTML = c.innerHTML), n && history.pushState({ path: e }, '', e), r(e), window.Prism && window.Prism.highlightAll());
					else throw new Error('Invalid page content');
				})
				.catch((t) => {
					console.error(t);
				})
				.finally(() => {
					document.body.classList.remove('loading');
				}));
	}
	(document.body.addEventListener('click', function (e) {
		const n = e.target.closest('a');
		if (n && n.getAttribute('href').startsWith('/')) {
			e.preventDefault();
			const t = n.getAttribute('href');
			a(t);
		}
	}),
		window.addEventListener('popstate', (e) => {
			const n = e.state?.path ?? s + '/';
			a(n, !1);
		}),
		r(window.location.pathname));
});
import createGlobe from 'https://cdn.skypack.dev/cobe';

let phi = 0;
let canvas = document.getElementById('cobe');

const globe = createGlobe(canvas, {
	devicePixelRatio: 2,
	width: canvas.clientWidth * 2,
	height: canvas.clientHeight * 2 - 370,
	phi: 0,
	theta: 0,
	dark: 1,
	diffuse: 1.2,
	scale: 2.5,
	mapSamples: 16000,
	mapBrightness: 6,
	baseColor: [0.5, 0.5, 0.5],
	markerColor: [1, 1, 1],
	glowColor: [0.05, 0.05, 0.05],
	offset: [0, 0],
	markers: [
		{ location: [36.3418, 140.4468], size: 0.05 }, // 茨城
		{ location: [40.7128, -74.006], size: 0.03 }, // ニューヨークのまま
	],
	onRender: (state) => {
		// Called on every animation frame.
		// `state` will be an empty object, return updated params.
		state.phi = phi;
		phi += 0.005;
	},
});
