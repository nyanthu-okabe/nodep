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
					if (c) {
						i.innerHTML = c.innerHTML;
						n && history.pushState({ path: e }, '', e);
						r(e);
						window.Prism && window.Prism.highlightAll();
						initializeGlobe(); // Call initializeGlobe after new content is loaded
					} else throw new Error('Invalid page content');
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
	initializeGlobe(); // Call initializeGlobe on initial DOMContentLoaded
});
import createGlobe from 'https://cdn.skypack.dev/cobe';

let globeInstance = null; // To store the globe instance for potential cleanup

function initializeGlobe() {
	const canvas = document.getElementById('cobe');
	if (!canvas) {
		return; // No canvas found on this page
	}

	// Destroy existing globe instance if it exists to prevent multiple globes
	if (globeInstance) {
		// Assuming createGlobe returns an object with a destroy method.
		// If not, we might need a different cleanup mechanism or accept re-initialization.
		// For now, if no destroy method, we'll let it be replaced.
		if (typeof globeInstance.destroy === 'function') {
			globeInstance.destroy();
		}
	}
	
	let phi = 0; // Reset phi for new globe
	let markers = [{ location: [36.3418, 140.4468], size: 0.05 }]

	globeInstance = createGlobe(canvas, {
		devicePixelRatio: 2,
		width: canvas.clientWidth * 2,
		height: canvas.clientHeight * 2 - 370,
		phi: 0,
		theta: 0,
		dark: 0,
		diffuse: 1.2,
		scale: 1,
		mapSamples: 16000,
		mapBrightness: 6,
		baseColor: [1, 1, 1],
		markerColor: [0.5, 0.7, 1],
		glowColor: [1, 1, 1],
		offset: [0, 0],
		markers: markers,
		onRender: (state) => {
			state.phi = phi
			phi += 0.015
			state.markers = markers
  		},
	});
	async function addUserPin() {
	  const res = await fetch("https://get.geojs.io/v1/ip/geo.json")
	  const data = await res.json()
	
	  const lat = parseFloat(data.latitude)
	  const lon = parseFloat(data.longitude)
	
	  markers.push({
	    location: [lat, lon],
	    size: 0.08
	  })
	}
	addUserPin();
}
