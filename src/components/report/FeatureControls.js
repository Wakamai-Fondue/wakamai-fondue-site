export default {
	props: ["showTitles"],
	data: () => ({
		// Features can have three states:
		// true  = turn explicitly ON in CSS
		// false = turn explicitly OFF in CSS
		// null  = leave at default, do not set anything in CSS
		features: {
			tnum: {
				state: true,
				name: "Tabular numbers"
			},
			ss01: {
				state: false,
				name: "Stylistic set 1"
			},
			liga: {
				state: null,
				name: "Ligatures"
			}
		}
	}),
	mounted: function() {
		this.updateStyles();
	},
	methods: {
		flipState(feature, state) {
			if (this.features[feature].state === state) {
				state = null;
			}
			this.features[feature].state = state;
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateFeatureStyles", this.getFeatureStyles());
		},
		getFeatureStyles: function() {
			let styles = "";
			let glue = "";
			for (const feature in this.features) {
				const state = this.features[feature].state;
				if (state === null) continue;
				styles += `${glue} "${feature}" ${state ? "1" : "0"}`;
				glue = ",";
			}
			return `font-feature-settings:${styles};`;
		},
		featureStateClass: function(state) {
			if (state === true) {
				return "on";
			} else if (state === false) {
				return "off";
			} else {
				return "default";
			}
		}
	}
};
