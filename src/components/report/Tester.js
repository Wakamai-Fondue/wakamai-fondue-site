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
	data() {
		return {
			customText: this.font.customText,
			variableStyles: "",
			featureStyles: "",
			textStyles: "",
			language: null
		};
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
			updatedLanguage = updatedLanguage || null;
			this.language = updatedLanguage;
		}
	}
};
