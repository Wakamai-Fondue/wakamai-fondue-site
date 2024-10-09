export default {
	props: ["font", "isExamplefont"],
	data() {
		return {
			summary: this.font.summary,
			features: this.font.features,
			hasLocalization: this.font.languageSystems.length > 0,
		};
	},
	computed: {
		featureLength() {
			return this.font.features.length || "no";
		},
		localizations() {
			return this.font.languageSystems.map((l) => l.name);
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
		},
	},
};
