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
	computed: {
		optionalFeatures() {
			return this.features.filter(f => f.state !== "fixed");
		}
	},
	mounted: function() {
		this.updateStyles();
	},
	methods: {
		getClass(feature) {
			return `status-${this.currentStates[feature]}`;
		},
		flipState(feature, state) {
			const states = [true, false, null];
			const currentIndex = states.indexOf(state);
			const nextIndex = (currentIndex + 1) % states.length;
			this.currentStates[feature] = states[nextIndex];
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateFeatureStyles", this.getFeatureStyles());
		},
		getFeatureStyles: function() {
			let styles = "";
			let glue = "";
			let counter = 0;
			let maxProps = 7;
			for (const feature of this.optionalFeatures) {
				let state;
				if (this.currentStates[feature.tag] !== undefined) {
					// CSS state exists, use it
					state = this.currentStates[feature.tag];
				} else {
					// No CSS state yet, create one based off default state
					state = feature.state === "on";
					this.$set(this.currentStates, feature.tag, state);
				}
				if (state === null) continue;
				styles += `${glue} "${feature.tag}" ${state ? "1" : "0"}`;
				glue = ",";
				// Poor man's code formatting
				if (++counter % maxProps === 0) {
					glue = `,\n                      `;
				}
			}
			if (styles) {
				return `font-feature-settings:${styles};`;
			} else {
				return "";
			}
		}
	}
};
