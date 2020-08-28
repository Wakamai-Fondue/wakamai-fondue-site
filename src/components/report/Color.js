// TODO: report on number of strikes + their sizes
export default {
	props: ["font"],
	data() {
		return {
			palettes: [
				["#ff0000", "#00ff00", "#666000"],
				["#123789", "#789123", "#800080"]
			]
		};
	},
	computed: {
		colorFormat() {
			const formats = ["COLR"]; // should come from font object
			if (formats.length === 1) return formats[0];
			let result = "";
			result = formats.pop();
			result = formats.join(", ") + " and " + result;
			return result;
		}
	}
};
