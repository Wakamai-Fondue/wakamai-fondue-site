import VariableControls from "./VariableControls.vue";
import FeatureControls from "./FeatureControls.vue";
import TextControls from "./TextControls.vue";
import CopyToClipboard from "../CopyToClipboard.vue";
import Prism from "vue-prism-component";

export default {
	props: ["font"],
	components: {
		VariableControls,
		FeatureControls,
		TextControls,
		Prism,
		CopyToClipboard,
	},
	data() {
		return {
			customText: this.font.customText,
			variableStyles: "",
			featureStyles: "",
			textStyles: "",
			language: null,
			sticky: false,
		};
	},
	computed: {
		html() {
			return this.getHTML();
		},
		styles() {
			return this.getStyles();
		},
	},
	methods: {
		updateOpticalSize: function () {
			this.$refs.VariableControls.updateOpticalSize();
		},
		unlinkOpticalSize: function () {
			this.$refs.TextControls.unlinkOpticalSize();
		},
		updateVariableStyles: function (updatedStyles) {
			this.variableStyles = updatedStyles;
		},
		updateFeatureStyles: function (updatedStyles) {
			this.featureStyles = updatedStyles;
		},
		updateTextStyles: function (updatedStyles) {
			this.textStyles = updatedStyles;
		},
		updateLanguage: function (updatedLanguage) {
			updatedLanguage = updatedLanguage || null;
			this.language = updatedLanguage;
		},
		getHTML: function () {
			if (this.language) {
				return `<div lang="${this.language}"> ... </div>`;
			} else {
				return `<div> ... </div>`;
			}
		},
		getStyles: function () {
			let css = this.textStyles;
			if (this.featureStyles) {
				css += `\n\n` + this.featureStyles;
			}
			if (this.variableStyles) {
				css += `\n\n` + this.variableStyles;
			}
			return css;
		},
		hasLocalization() {
			return this.font.languageSystems.length > 0;
		},
	},
};
