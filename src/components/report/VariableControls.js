export default {
	props: ["font", "showAxes", "showInstances", "showTitles", "showStyles"],
	data() {
		return {
			activeInstance: ""
		};
	},
	computed: {
		axes() {
			return this.font.variables.axes;
		},
		instances() {
			return this.font.variables.instances;
		},
		variableStyles() {
			return this.getVariableStyles(this.axes);
		}
	},
	mounted: function() {
		this.updateStyles();
	},
	methods: {
		resetAxis: function(axis) {
			this.axes[axis].current = this.axes[axis].default;
			this.updateStyles();
		},
		selectInstance: function(instance) {
			this.activeInstance = instance;
			for (const axis in this.instances[instance]) {
				const value = this.instances[instance][axis];
				this.axes[axis].current = value;
			}
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit(
				"updateVariableStyles",
				this.getVariableStyles(this.axes)
			);
			this.matchInstance();
		},
		matchInstance: function() {
			// Using a simple JSON.stringify to compare an object with the
			// current axes values, with the axes values of the instances.
			const currentAxes = {};
			for (const axis in this.axes) {
				currentAxes[axis] = this.axes[axis].current;
			}
			const current = JSON.stringify(currentAxes);

			let activeInstance = "";
			for (const instance in this.instances) {
				if (current === JSON.stringify(this.instances[instance])) {
					activeInstance = instance;
				}
			}
			this.activeInstance = activeInstance;
		},
		getVariableStyles: function(axes) {
			let styles = "";
			let glue = "";
			for (const axis in axes) {
				// Get .current if "global" styles are used, otherwise
				// use direct from key/value
				const value = axes[axis].current || axes[axis];
				styles += `${glue} "${axis}" ${value}`;
				glue = ",";
			}
			return `font-variation-settings:${styles};`;
		}
	}
};
