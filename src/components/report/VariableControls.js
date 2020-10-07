import Prism from "vue-prism-component";

export default {
	props: ["font", "showAxes", "showInstances", "showTitles", "showStyles"],
	components: {
		Prism
	},
	data() {
		return {
			activeInstance: "",
			axes: this.font.variable.axes,
			instances: this.font.variable.instances
		};
	},
	computed: {
		variableStyles() {
			return this.getVariableStyles();
		},
		hasIntances() {
			return Object.entries(this.instances).length > 0;
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
				const targetAxis = this.axes.find(o => o.id === axis);
				targetAxis.current = value;
			}
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateVariableStyles", this.getVariableStyles());
			this.matchInstance();
		},
		matchInstance: function() {
			// Using a simple JSON.stringify to compare an object with the
			// current axes values, with the axes values of the instances.
			const currentAxes = {};
			for (const axis of Object.values(this.axes)) {
				currentAxes[axis.id] = axis.current;
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
		getVariableStyles: function() {
			let styles = "";
			let glue = "";
			let counter = 0;
			let maxProps = 6;
			for (const axis of Object.values(this.axes)) {
				styles += `${glue} "${axis.id}" ${axis.current}`;
				glue = ",";
				// Poor man's code formatting
				if (++counter % maxProps === 0) {
					glue = `,\n                        `;
				}
			}
			if (styles) {
				return `font-variation-settings:${styles};`;
			} else {
				return "";
			}
		},
		getInstanceStyles: function(instance) {
			const styles = Object.entries(this.instances[instance])
				.map(([axis, value]) => `"${axis}" ${value}`)
				.join(",");
			return `font-variation-settings:${styles};`;
		}
	}
};
