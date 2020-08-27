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
			let count = 0;
			if (this.font.variable) {
				count = this.font.variable.axes.length;
			}
			return count || "no";
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
