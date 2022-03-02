import { StyleSheet } from './sheet.js';

/*
Sample code for theme loader.
This is needed for the iframe to be styled. At this point, all changes on the iframe side needs to be done manually
In addition to this script, we also need to insert a script tag into the iframe head:
<script id="theme-loader" data-key="shopping-links" src="./theme-loader" />
*/
const { log } = console;
const loggerKey = 'THEME-LOADER';

// from app/styles/@theme-system/messenger/utils.js
export const themeLoaderPrefix = 'theme-loader.';

export function isValidType(data, prefix = themeLoaderPrefix) {
	const type = typeof data;

	// return if it's of a different type
	if (!['string', 'object'].includes(type)) return null;

	// check the prefix on a string
	if (type === 'string' && !data.startsWith(prefix)) return null;

	// check the prefix on a key field
	if (type === 'object' && !data.key?.startsWith(prefix)) return null;

	const key =
		type === 'string' ? data.split('.').pop() : data.key.split('.').pop();

	// return the type
	return {
		type,
		key,
	};
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

	window.top.postMessage(`${themeLoaderPrefix}${key}`, '*');

	window.addEventListener('message', ({ data }) => {
		const type = isValidType(data);
		if (!type) return;

		const loaderKey = `${themeLoaderPrefix}${type.key}`;
		if (type.type === 'string') {
			window.top.postMessage(loaderKey, '*');
		} else {
			postStyles(data, loaderKey);
		}
	});
}

loadTheme();

export default loadTheme;
