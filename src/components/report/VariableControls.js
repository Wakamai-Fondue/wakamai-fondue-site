export default {
	props: ["font", "showAxes", "showInstances", "showTitles"],
	data() {
		return {
			activeInstance: "",
			// ↓ This should come from the font prop, once it's wired up
			axes: {
				abcd: {
					name: "The ABCD axis",
					min: 100,
					max: 900,
					default: 200,
					current: 200 // Starts as `default` and changes when slider is pulled
				},
				OOPS: {
					name: "Ididitagain",
					min: 1,
					max: 1000,
					default: 666,
					current: 666 // Starts as `default` and changes when slider is pulled
				}
			},
			instances: {
				"Mono Casual Light": { abcd: 800, OOPS: 666 },
				"Mono Casual Light Italic!!": { abcd: 400, OOPS: 666 },
				"Mono Casual Regular": { abcd: 123, OOPS: 666 }
			}
		};
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
			this.$emit("updateStyles", this.axesStyles(this.axes));
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
		axesStyles: function(axes) {
			let axisCSS = "";
			let glue = "";
			for (const axis in axes) {
				// Get .current if "global" styles are used, otherwise
				// use direct from key/value
				const value = axes[axis].current || axes[axis];
				axisCSS += `${glue} "${axis}" ${value}`;
				glue = ",";
			}
			return `font-variation-settings:${axisCSS}`;
		}
	}
};
