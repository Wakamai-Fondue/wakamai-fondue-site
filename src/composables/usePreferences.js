import { reactive, ref, watch } from "vue";

const DEFAULT_PREVIEW_TEXT =
	'The melting cheese & bread explode in a quick wave of joy: "1, 2, 3... zen!?"';
const DEFAULT_FONT_SIZE = 48;

const previewTexts = reactive({
	default: DEFAULT_PREVIEW_TEXT,
	typeTester: null,
	variableFont: null,
	features: {},
});
const fontSize = ref(DEFAULT_FONT_SIZE);

export function usePreferences() {
	const getPreviewText = (key) => {
		if (key && key.startsWith("feature:")) {
			const featureTag = key.slice(8);
			return previewTexts.features[featureTag] || previewTexts.default;
		}
		return previewTexts[key] || previewTexts.default;
	};

	const setPreviewTexts = (texts) => {
		if (typeof texts === "string") {
			previewTexts.default = texts;
			return;
		}
		if (!texts || typeof texts !== "object") return;

		for (const key of ["default", "typeTester", "variableFont"]) {
			if (key in texts) previewTexts[key] = texts[key];
		}
		if (texts.features) {
			Object.assign(previewTexts.features, texts.features);
		}
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
		previewTexts,
		fontSize,
		getPreviewText,
		setPreviewTexts,
		setFontSize,
		resetFontSize,
	};
}
