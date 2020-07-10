export default {
	props: ["variables", "showAxes", "showInstances", "showTitles"],
	data() {
		return {
			activeInstance: ""
			// ↓ This should come from the font prop, once it's wired up
		};
	},
	methods: {
		resetAxis: function(axis) {
			this.variables.axes.find(
				ax => ax.id == axis
			).current = this.variables.axes.find(ax => ax.id == axis).default;
			this.activeInstance = "";
		},
		updateAxes: function() {
			this.$emit("updateAxes", this.variables.axes);
			this.activeInstance = "";
		},
		selectInstance: function(instance) {
			this.activeInstance = instance;
			for (const axis in this.variables.instances[instance]) {
				if (axis !== "name") {
					const value = this.variables.instances[instance][axis];
					this.variables.axes.find(
						ax => ax.id == axis
					).current = value;
				}
			}
		},
		sampleStyle: function(axes) {
			let axisCSS = "";
			let glue = "";
			for (const axis in axes) {
				axisCSS += `${glue} "${axis}" ${axes[axis]}`;
				glue = ",";
			}
			return `font-variation-settings:${axisCSS}`;
		}
	}
};
