import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls
	},
	data: () => ({
		// ↓ All data down here should come from the font, once it's wired up
		// Should be falsy to prevent component from being rendered
		axesStyles: ""
	}),
	methods: {
		updateStyles: function(updatedStyles) {
			this.axesStyles = updatedStyles;
		}
	}
};
