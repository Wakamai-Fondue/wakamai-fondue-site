import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls
	},
	computed: {
		axesStyle() {
			if (!this.showAxes) return;
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
		showFeatures: true,
		showAxes: true,
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
		},
		hasFeatures: true, // Should be determined by the font
		hasAxes: true, // Should be determined by the font
		charCount: 123, // Total number of char (non-feature) glyphs
		allCharCount: 321, // Total number of glyphs: chars *and* features
		// FAKE UGLY DUMMY CHARS, these make no sense now
		chars: [
			{
				char: "!",
				code: 65,
				feature: ""
			},
			{
				char: '"',
				code: 65,
				feature: "smcp"
			},
			{
				char: "#",
				code: 65,
				feature: ""
			},
			{
				char: "$",
				code: 65,
				feature: "ss01"
			},
			{
				char: "%",
				code: 65,
				feature: "ss02"
			},
			{
				char: "&",
				code: 65,
				feature: "ss03"
			},
			{
				char: "'",
				code: 65,
				feature: ""
			},
			{
				char: "(",
				code: "6a",
				feature: ""
			},
			{
				char: ")",
				code: 65,
				feature: ""
			},
			{
				char: "*",
				code: 65,
				feature: ""
			},
			{
				char: "+",
				code: 65,
				feature: ""
			},
			{
				char: ",",
				code: 65,
				feature: ""
			},
			{
				char: "-",
				code: 65,
				feature: ""
			},
			{
				char: ".",
				code: 65,
				feature: ""
			},
			{
				char: "/",
				code: 65,
				feature: ""
			},
			{
				char: "0",
				code: 65,
				feature: ""
			},
			{
				char: "1",
				code: 65,
				feature: ""
			},
			{
				char: "2",
				code: 65,
				feature: ""
			},
			{
				char: "3",
				code: 65,
				feature: ""
			},
			{
				char: "4",
				code: 65,
				feature: ""
			},
			{
				char: "5",
				code: 65,
				feature: ""
			}
		]
	}),
	methods: {
		flipFeatures: function() {
			this.showFeatures = !this.showFeatures;
		},
		flipAxes: function() {
			this.showAxes = !this.showAxes;
		},
		updateAxes: function(updatedAxes) {
			this.axes = updatedAxes;
		}
	}
};
