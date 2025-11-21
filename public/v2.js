
document.addEventListener('DOMContentLoaded', function () {
	const content = document.getElementById('content');
	const lang = document.documentElement.lang;
	const prefix = lang === 'en' ? '' : '/' + lang;

	function updateNav(path) {
		const navLinks = document.querySelectorAll('header nav a');
		navLinks.forEach((link) => {
			const linkPath = link.getAttribute('href');
			if (linkPath === path) {
				link.setAttribute('data-current', 'true');
			} else {
				link.removeAttribute('data-current');
			}
		});
	}

	function loadPage(path, pushState = true) {
		document.body.classList.add('loading');
		fetch(path)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
				}
				return res.text();
			})
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const newContent = doc.querySelector('#content');
				if (newContent) {
					content.innerHTML = newContent.innerHTML;
					if (pushState) {
						history.pushState({ path }, '', path);
					}
					updateNav(path);
					// If Prism is loaded, highlight all code blocks
					if (window.Prism) {
						window.Prism.highlightAll();
					}
				} else {
					throw new Error('Invalid page content');
				}
			})
			.catch((err) => {
				console.error(err);
				// You can also display a user-friendly error message here
			})
			.finally(() => {
				document.body.classList.remove('loading');
			});
	}

	document.body.addEventListener('click', function (event) {
		const target = event.target.closest('a');
		if (target && target.getAttribute('href').startsWith('/')) {
			event.preventDefault();
			const path = target.getAttribute('href');
			loadPage(path);
		}
	});

	window.addEventListener('popstate', (event) => {
		const path = event.state?.path ?? prefix + '/';
		loadPage(path, false);
	});

	// Initial page load
	updateNav(window.location.pathname);
});
