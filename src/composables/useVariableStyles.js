import { ref } from "vue";

const variableStyles = ref("");
const autoOpticalSizing = ref(true);

export function useVariableStyles() {
	const setVariableStyles = (styles) => {
		variableStyles.value = styles;
	};

	const setAutoOpticalSizing = (value) => {
		autoOpticalSizing.value = value;
	};

	const reset = () => {
		variableStyles.value = "";
		autoOpticalSizing.value = true;
	};

	return {
		variableStyles,
		autoOpticalSizing,
		setVariableStyles,
		setAutoOpticalSizing,
		reset,
	};
}
