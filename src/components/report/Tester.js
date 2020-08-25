import VariableControls from "./VariableControls.vue";
import FeatureControls from "./FeatureControls.vue";
import TextControls from "./TextControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls,
		FeatureControls,
		TextControls
	},
	data: () => ({
		variableStyles: "",
		featureStyles: "",
		textStyles: "",
		language: ""
	}),
	computed: {
		customText: () => {
			// TODO: check if there's a name table
			// entry 19 and return that
			const customText = false;
			if (customText) {
				return "This is custom text";
			}
		}
	},
	methods: {
		updateVariableStyles: function(updatedStyles) {
			this.variableStyles = updatedStyles;
		},
		updateFeatureStyles: function(updatedStyles) {
			this.featureStyles = updatedStyles;
		},
		updateTextStyles: function(updatedStyles) {
			this.textStyles = updatedStyles;
		},
		updateLanguage: function(updatedLanguage) {
			this.language = updatedLanguage;
		}
	}
};
