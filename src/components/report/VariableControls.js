import Prism from "vue-prism-component";
import CopyToClipboard from "../CopyToClipboard.vue";

export default {
	props: [
		"font",
		"showAxes",
		"showInstances",
		"showTitles",
		"showStyles",
		"linkOpticalSize",
		"fontSize",
	],
	components: {
		Prism,
		CopyToClipboard,
	},
	data() {
		return {
			activeInstance: "",
			axes: this.font.variable.axes,
			instances: this.font.variable.instances,
			currentStates: {},
		};
	},
	computed: {
		variableStyles() {
			return this.getVariableStyles();
		},
		hasIntances() {
			return Object.entries(this.instances).length > 0;
		},
		instanceCount() {
			return Object.entries(this.instances).length;
		},
	},
	mounted: function () {
		this.updateStyles();
	},
	watch: {
		fontSize: function (size) {
			this.updateOpticalSize(size);
		},
		linkOpticalSize: function (linked) {
			if (linked) {
				this.updateOpticalSize(this.fontSize);
			}
		},
	},
	methods: {
		updateOpticalSize(fontSize) {
			if (this.font.hasOpticalSize) {
				const targetAxis = this.axes.find((o) => o.id === "opsz");
				const opszValue = Math.min(
					Math.max(targetAxis.min, fontSize),
					targetAxis.max
				);
				this.setAxis("opsz", opszValue);
				// If axis was turned off, linking turns it on again
				this.currentStates["opsz"] = true;
				this.updateStyles();
			}
		},
		resetAxis: function (axis) {
			if (axis === "opsz") {
				this.$emit("unlinkOpticalSize");
			}
			const defaultValue = this.axes.find((o) => o.id === axis).default;
			this.setAxis(axis, defaultValue);
		},
		setAxis: function (axis, value) {
			this.axes.find((o) => o.id === axis).current = value;
			this.updateStyles();
		},
		selectInstance: function (instance) {
			this.activeInstance = instance;
			for (const axis in this.instances[instance]) {
				const value = this.instances[instance][axis];
				const targetAxis = this.axes.find((o) => o.id === axis);
				targetAxis.current = value;
			}
			this.updateStyles();
		},
		updateStyles: function (axis) {
			if (axis === "opsz") {
				this.$emit("unlinkOpticalSize", false);
			}
			this.$emit("updateVariableStyles", this.getVariableStyles());
			this.matchInstance();
		},
		matchInstance: function () {
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
		getVariableStyles: function () {
			let styles = "";
			let glue = "";
			let counter = 0;
			let maxProps = 6;
			for (const axis of Object.values(this.axes)) {
				if (this.currentStates[axis.id] !== false) {
					styles += `${glue} "${axis.id}" ${axis.current}`;
					glue = ",";
					// Poor man's code formatting
					if (++counter % maxProps === 0) {
						glue = `,\n                        `;
					}
				}
			}
			if (styles) {
				return `font-variation-settings:${styles};`;
			} else {
				return "";
			}
		},
		getInstanceStyles: function (instance) {
			const styles = Object.entries(this.instances[instance])
				.map(([axis, value]) => `"${axis}" ${value}`)
				.join(",");
			return `font-variation-settings:${styles};`;
		},
		getBestStep: function (axis) {
			// Step in units of 1 when range is > 1,
			// Step in units of 0.1 when range is <= 1
			if (
				Math.abs(parseInt(axis.max, 10)) -
					Math.abs(parseInt(axis.min, 10)) <=
				1
			) {
				return "0.1";
			} else {
				return "1";
			}
		},
		flipState(axis, force) {
			this.currentStates[axis] =
				force || this.currentStates[axis] === false;
			if (axis === "opsz" && !force) {
				this.$emit("unlinkOpticalSize");
			}
			this.updateStyles();
		},
	},
};
