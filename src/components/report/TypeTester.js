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
			linkOpticalSize: false,
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
			console.log("updateOpticalSize");
			this.linkOpticalSize = !this.linkOpticalSize;
			// this.$refs.VariableControls.updateOpticalSize();
			// this.$emit("updateOpticalSize");
		},
		unlinkOpticalSize: function (linked) {
			// this.$refs.TextControls.unlinkOpticalSize();
			// console.log("unlinkOpticalSize", x);
			// this.$emit("unlinkOpticalSize");
			// console.log(linked);
			this.linkOpticalSize = linked;
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
