import { StyleSheet } from './sheet.js';

/*
Sample code for theme loader.
This is needed for the iframe to be styled. At this point, all changes on the iframe side needs to be done manually
In addition to this script, we also need to insert a script tag into the iframe head:
<script id="theme-loader" data-key="shopping-links" src="./theme-loader" />
*/
const { log } = console;
const loggerKey = 'THEME-LOADER';
const messengerReady = 'theme-messenger: ready';

function loadTheme() {
	const script = document.getElementById('theme-loader');

	const key = script.dataset ? script.dataset.key : '';

	if (!key) {
		throw new Error(`${loggerKey}: no key found`);
	}

	log(`${loggerKey}: load iframe with key`, key);

	const sheet = new StyleSheet({
		key,
		container: document.head,
	});

	window.addEventListener('message', ({ data }) => {
		if (typeof data === 'string' && data === messengerReady) {
			log(`${loggerKey}: receive message ${messengerReady}`);
			window.top.postMessage(`theme-loader.${key}`, '*');
		} else if (data && data.key === key && data.styles) {
			log(`${loggerKey}: INSERT STYLE`, data.styles);
			sheet.insert(data.styles);
		}
	});
}

loadTheme();

export default loadTheme;
