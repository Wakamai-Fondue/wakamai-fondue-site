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
		hasLocalization() {
			return this.font.languageSystems.length > 0;
		},
		featureLength() {
			return this.font.features.length || "no";
		},
		languages() {
			return this.font.languageSystems.map(l => l.name);
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
