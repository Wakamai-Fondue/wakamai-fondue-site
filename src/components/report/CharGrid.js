import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls
	},
	data() {
		return {
			variableStyles: "",
			showCategories: true,
			chars: this.font.supportedCharacters,
			catChars: this.font.categorisedCharacters,
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
		toggleCategories: function() {
			this.showCategories = !this.showCategories;
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
