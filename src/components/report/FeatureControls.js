export default {
	props: ["showTitles"],
	data: () => ({
		features: {
			tnum: 1,
			ss01: 0,
			ss02: 0,
			salt: 1,
			kern: 0
		}
	}),
	methods: {
		flipState(feature) {
			this.features[feature] = 1 - this.features[feature];
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateFeatureStyles", this.getFeatureStyles());
		},
		getFeatureStyles: function() {
			let styles = "";
			let glue = "";
			for (const feature in this.features) {
				styles += `${glue} "${feature}" ${this.features[feature]}`;
				glue = ",";
			}
			return `font-feature-settings:${styles};`;
		}
	}
};
