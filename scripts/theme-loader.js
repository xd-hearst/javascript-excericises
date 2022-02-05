import { StyleSheet } from './sheet.js';

(function loadTheme() {
	console.log('loadTheme');
	const script = document.getElementById('theme-loader');

	const key = script.dataset ? script.dataset.key : '';

	console.log('load iframe with key ', key);

	if (!key) {
		throw new Error('no key found');
	}

	const sheet = new StyleSheet({
		key,
		container: document.head,
	});

	window.addEventListener('message', ({ data }) => {
		console.log('from iframe message received', data);

		if (typeof data === 'string' && data === 'ready-to-receive-message') {
			console.log('from iframe receive message eady-to-receive-message', data);

			window.top.postMessage(`theme-loader.${key}`, '*');
		} else if (data && data.key === key && data.styles) {
			console.log('INSERT STYLES', data.styles);
			sheet.insert(data.styles);
		}
	});
})();
