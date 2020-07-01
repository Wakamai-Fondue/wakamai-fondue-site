export default {
	// props: ["font"]
	data() {
		return {
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
			}
		};
	},
	methods: {
		resetAxis: function(axis) {
			this.axes[axis].current = this.axes[axis].default;
		},
		updateAxes: function() {
			this.$emit("updateAxes", this.axes);
		}
	}
};
