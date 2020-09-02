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
			const count =
				Object.keys(this.features.fixed).length +
				Object.keys(this.features.optional).length;
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
	}
};
