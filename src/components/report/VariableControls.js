export default {
	props: ["font", "showAxes", "showInstances", "showTitles", "showStyles"],
	data() {
		return {
			activeInstance: "",
			// ↓ This should come from the font prop, once it's wired up
			axes: {
				wdth: {
					name: "Width",
					min: 100,
					max: 900,
					default: 200,
					current: 200 // Starts as `default` and changes when slider is pulled
				},
				wght: {
					name: "Weight",
					min: 1,
					max: 1000,
					default: 666,
					current: 666 // Starts as `default` and changes when slider is pulled
				}
			},
			instances: {
				"Mono Casual Light": { wdth: 800, wght: 666 },
				"Mono Casual Light Italic": { wdth: 400, wght: 666 },
				"Mono Casual Regular": { wdth: 123, wght: 666 }
			}
		};
	},
	computed: {
		variableStyles() {
			return this.getVariableStyles(this.axes);
		}
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
