import Sliders from "./Sliders.vue";

export default {
	props: ["font"],
	components: {
		Sliders
	},
	computed: {
		axesStyle() {
			let axisCSS = "";
			let glue = "";
			for (const axis in this.axes) {
				axisCSS += `${glue} "${axis}" ${this.axes[axis].current}`;
				glue = ",";
			}
			return `font-variation-settings:${axisCSS}`;
		}
	},
	data: () => ({
		// ↓ All data down here should come from the font, once it's wired up
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
		}
	}),
	methods: {
		updateAxes: function(updatedAxes) {
			this.axes = updatedAxes;
		}
	}
};
