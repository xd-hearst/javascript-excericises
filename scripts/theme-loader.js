import { StyleSheet } from './sheet.js';

/*
Sample code for theme loader.
This is needed for the iframe to be styled. At this point, all changes on the iframe side needs to be done manually
In addition to this script, we also need to insert a script tag into the iframe head:
<script id="theme-loader" data-key="shopping-links" src="./theme-loader" />
*/
const { log } = console;
const loggerKey = 'THEME-LOADER';

function postThemekey(data, key) {
	if (!data.startsWith('theme-messenger')) return;
	window.top.postMessage(`theme-loader.${key}`, '*');
}

function postStyles(data, key) {
	if (data.key !== key || !data.styles) return;
	const sheet = new StyleSheet({
		key,
		container: document.head,
	});

	log(`${loggerKey}: INSERT STYLE`, data.styles);
	sheet.insert(data.styles);
}

function loadTheme() {
	const script = document.getElementById('theme-loader');

	const key = script.dataset ? script.dataset.key : '';

	if (!key) {
		throw new Error(`${loggerKey}: no key found`);
	}

	log(`${loggerKey}: load iframe with key`, key);

	window.top.postMessage(`theme-loader.${key}`, '*');

	window.addEventListener('message', ({ data }) => {
		console.log(data);
		const isDataAstring = typeof data === 'string';
		const isDataAnObject = typeof data === 'object';

		if (!isDataAstring && !isDataAnObject) return;

		if (isDataAstring) {
			postThemekey(data, key);
		} else {
			postStyles(data, key);
		}
	});
}

loadTheme();

export default loadTheme;
