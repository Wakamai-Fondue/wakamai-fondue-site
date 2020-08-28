export default {
	props: ["font"],
	data() {
		return {
			summary: this.font.summary,
			features: this.font.features,
			charCount: this.font.supportedCharacters.length
		};
	},
	computed: {
		featureLength() {
			const count = Object.keys(this.features).length;
			return count || "no";
		},
		axesCount() {
			if (this.font.variable) {
				return this.font.variable.axes.length;
			} else {
				return "no";
			}
		},
		instancesCount() {
			let count = 0;
			if (this.font.variable) {
				count = Object.keys(this.font.variable.instances).length;
			}
			return count || "no";
		}
	},
	filters: {
		pluralize: function(value, word) {
			return `${word}${value !== 1 ? "s" : ""}`;
		},
		listify: function(array) {
			if (array.length === 1) return array[0];
			const last = array[array.length - 1];
			return array.slice(0, array.length - 1).join(", ") + " and " + last;
		}
	}
};
