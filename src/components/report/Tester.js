import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls
	},
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
		updateAxes: function(updatedAxes) {
			this.axes = updatedAxes;
		}
	}
};
