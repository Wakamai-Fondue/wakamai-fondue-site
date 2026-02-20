import { ref, watch } from "vue";

const DEFAULT_PREVIEW_TEXT =
	'The melting cheese & bread explode in a quick wave of joy: "1, 2, 3… zen!"';
const DEFAULT_FONT_SIZE = 48;

const previewText = ref(DEFAULT_PREVIEW_TEXT);
const fontSize = ref(DEFAULT_FONT_SIZE);

export function usePreferences() {
	const setPreviewText = (text) => {
		previewText.value = text;
	};

	const setFontSize = (size) => {
		fontSize.value = size;
		document.body.style.setProperty("--preview-font-size", `${size}px`);
	};

	const resetFontSize = () => {
		setFontSize(DEFAULT_FONT_SIZE);
	};

	watch(fontSize, (newSize) => {
		document.body.style.setProperty("--preview-font-size", `${newSize}px`);
	});

	return {
		previewText,
		fontSize,
		setPreviewText,
		setFontSize,
		resetFontSize,
	};
}
