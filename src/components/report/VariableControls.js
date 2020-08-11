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
				"Mono Casual Light": { abcd: 800 },
				"Mono Casual Light Italic": { abcd: 400 },
				"Mono Casual Regular": { abcd: 123 },
				"Mono Casual Italic": { abcd: 123 },
				"Mono Casual Medium": { abcd: 123 },
				"Mono Casual Medium Italic": { abcd: 123 },
				"Mono Casual SemiBold": { abcd: 123 },
				"Mono Casual SemiBold Italic": { abcd: 123 },
				"Mono Casual Bold": { abcd: 123 },
				"Mono Casual Bold Italic": { abcd: 123 },
				"Mono Casual ExtraBold": { abcd: 123 },
				"Mono Casual ExtraBold Italic": { abcd: 123 },
				"Mono Casual Black": { abcd: 123 },
				"Mono Casual Black Italic": { abcd: 123 },
				"Mono Casual ExtraBlack": { abcd: 123 },
				"Mono Casual ExtraBlack Italic": { abcd: 123 },
				"Mono Linear Light": { abcd: 123 },
				"Mono Linear Light Italic": { abcd: 123 },
				"Mono Linear Regular": { abcd: 123 },
				"Mono Linear Italic": { abcd: 123 },
				"Mono Linear Medium": { abcd: 123 },
				"Mono Linear Medium Italic": { abcd: 123 },
				"Mono Linear SemiBold": { abcd: 123 },
				"Mono Linear SemiBold Italic": { abcd: 123 },
				"Mono Linear Bold": { abcd: 123 },
				"Mono Linear Bold Italic": { abcd: 123 },
				"Mono Linear ExtraBold": { abcd: 123 },
				"Mono Linear ExtraBold Italic": { abcd: 123 },
				"Mono Linear Black": { abcd: 123 },
				"Mono Linear Black Italic": { abcd: 123 },
				"Mono Linear ExtraBlack": { abcd: 123 },
				"Mono Linear ExtraBlack Italic": { abcd: 123 },
				"Sans Casual Light": { abcd: 123 },
				"Sans Casual Light Italic": { abcd: 123 },
				"Sans Casual Regular": { abcd: 123 },
				"Sans Casual Italic": { abcd: 123 },
				"Sans Casual Medium": { abcd: 123 },
				"Sans Casual Medium Italic": { abcd: 123 },
				"Sans Casual SemiBold": { abcd: 123 },
				"Sans Casual SemiBold Italic": { abcd: 123 },
				"Sans Casual Bold": { abcd: 123 },
				"Sans Casual Bold Italic": { abcd: 123 },
				"Sans Casual ExtraBold": { abcd: 123 },
				"Sans Casual ExtraBold Italic": { abcd: 123 },
				"Sans Casual Black": { abcd: 123 },
				"Sans Casual Black Italic": { abcd: 123 },
				"Sans Casual ExtraBlack": { abcd: 123 },
				"Sans Casual ExtraBlack Italic": { abcd: 123 },
				"Sans Linear Light": { abcd: 123 },
				"Sans Linear Light Italic": { abcd: 123 },
				"Sans Linear Regular": { abcd: 123 },
				"Sans Linear Italic": { abcd: 123 },
				"Sans Linear Medium": { abcd: 123 },
				"Sans Linear Medium Italic": { abcd: 123 },
				"Sans Linear SemiBold": { abcd: 123 },
				"Sans Linear SemiBold Italic": { abcd: 123 },
				"Sans Linear Bold": { abcd: 123 },
				"Sans Linear Bold Italic": { abcd: 123 },
				"Sans Linear ExtraBold": { abcd: 123 },
				"Sans Linear ExtraBold Italic": { abcd: 123 },
				"Sans Linear Black": { abcd: 123 },
				"Sans Linear Black Italic": { abcd: 123 },
				"Sans Linear ExtraBlack": { abcd: 123 },
				"Sans Linear ExtraBlack Italic": { abcd: 123, OOPS: 432 }
			}
		};
	},
	methods: {
		resetAxis: function(axis) {
			this.axes[axis].current = this.axes[axis].default;
			this.activeInstance = "";
			// TODO: Instead of assuming no instance is active after
			// a reset, check if the current this.axes values match
			// a named instance.
			this.updateStyles(true);
		},
		selectInstance: function(instance) {
			this.activeInstance = instance;
			for (const axis in this.instances[instance]) {
				const value = this.instances[instance][axis];
				this.axes[axis].current = value;
			}
			this.updateStyles(false);
		},
		updateStyles: function(resetInstance) {
			this.$emit("updateStyles", this.axesStyles(this.axes));
			if (resetInstance) {
				this.activeInstance = "";
			}
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
