import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls
	},
	data() {
		return {
			variableStyles: "",
			chars: this.font.supportedCharacters,
			charCount: this.font.supportedCharacters.length,
			hasAxes: this.font.variable && this.font.variable.axes.length,
			showAxes: this.font.isVariable,
			hasFeatures: false, // TODO: Should be determined by the font
			showFeatures: false // TODO: Should be determined by the font
		};
	},
	methods: {
		entitify: function(code) {
			return `&#x${code};`;
		},
		toggleAxes: function() {
			this.variableStyles = "";
			this.showAxes = !this.showAxes;
		},
		// toggleFeatures: function() {
		// 	this.showFeatures = !this.showFeatures;
		// },
		updateVariableStyles: function(updatedStyles) {
			this.variableStyles = updatedStyles;
		}
	}
};
