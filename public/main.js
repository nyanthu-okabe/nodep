document.addEventListener('DOMContentLoaded', function () {
								const buttons = document.querySelectorAll('[data-target]');
								const content = document.getElementById('content');

								function loadPage(target) {
									const url = target === '' ? '/' : '/' + target;
									fetch(url)
										.then((response) => response.text())
										.then((html) => {
											const parser = new DOMParser();
											const doc = parser.parseFromString(html, 'text/html');
											const newContent = doc.querySelector('#content').innerHTML;
											content.innerHTML = newContent;
											history.pushState({ target: target }, '', url);

											Prism.highlightAll();
										});
								}

								buttons.forEach((button) => {
									button.addEventListener('click', function () {
										const target = this.getAttribute('data-target');
										loadPage(target);
									});
								});

								window.addEventListener('popstate', function (event) {
									if (event.state && event.state.target) {
										loadPage(event.state.target);
									} else {
										loadPage('');
									}
								});
							});`,
