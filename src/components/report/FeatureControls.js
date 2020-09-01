// Features can have three states in the UI:
// true  = turn explicitly ON in CSS
// false = turn explicitly OFF in CSS
// null  = leave at default, do not set anything in CSS

export default {
	props: ["font", "showTitles"],
	data() {
		return {
			features: this.font.features,
			currentStates: []
		};
	},
	mounted: function() {
		this.updateStyles();
	},
	methods: {
		getClass(feature) {
			return `status-${this.currentStates[feature]}`;
		},
		flipState(feature, state) {
			if (this.currentStates[feature] === state) {
				state = null;
			}
			this.currentStates[feature] = state;
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateFeatureStyles", this.getFeatureStyles());
		},
		getFeatureStyles: function() {
			let styles = "";
			let glue = "";
			for (const feature in this.features) {
				let state;
				if (this.currentStates[feature] !== undefined) {
					// CSS state exists, use it
					state = this.currentStates[feature];
				} else {
					// No CSS state yet, create one based off
					// the
					if (this.features[feature].state === "fixed") {
						state = null;
					} else {
						state = this.features[feature].state === "on";
					}
					this.$set(this.currentStates, feature, state);
				}
				if (state === null) continue;
				styles += `${glue} "${feature}" ${state ? "1" : "0"}`;
				glue = ",";
			}
			return `font-feature-settings:${styles};`;
		},
		recommendation: function(value) {
			return value === "fixed" ? "always on" : value;
		}
	}
};
