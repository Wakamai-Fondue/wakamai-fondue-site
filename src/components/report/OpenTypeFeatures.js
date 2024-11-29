export default {
	props: ["font"],
	data() {
		return {
			currentStates: [],
			hasOptionalFeatures:
				this.font.features.filter((f) => f.state !== "fixed").length >
				0,
			hasRequiredFeatures:
				this.font.features.filter((f) => f.state === "fixed").length >
				0,
			featureChars: this.getFeatureChars(),
		};
	},
	computed: {
		optionalFeatures() {
			return this.font.features.filter((f) => f.state !== "fixed");
		},
		requiredFeatures() {
			return this.font.features.filter((f) => f.state === "fixed");
		},
	},
	methods: {
		getFeatureChars() {
			// Try to return the "best" layout features
			if (
				"DFLT" in this.font.featureChars &&
				"dflt" in this.font.featureChars["DFLT"]
			) {
				return this.font.featureChars["DFLT"]["dflt"];
			} else if (
				"latn" in this.font.featureChars &&
				"dflt" in this.font.featureChars["latn"]
			) {
				return this.font.featureChars["latn"]["dflt"];
			} else if (Object.keys(this.font.featureChars).length > 0) {
				// If all else fails, return first
				const first = Object.keys(this.font.featureChars)[0];
				return Object.values(this.font.featureChars[first])[0];
			} else {
				return {};
			}
		},
		flipState(feature) {
			this.currentStates[feature] = 1 - this.currentStates[feature];
		},
		isValidFeature(feature) {
			return (
				this.featureChars[feature.tag] &&
				this.featureChars[feature.tag]["lookups"].length &&
				this.featureChars[feature.tag]["lookups"][0]["input"].length
			);
		},
		// Use onState for features that take a specific number
		// instead of just 0 or 1.
		getFeatureStyle: function (feature, onState = 1) {
			const offState = 0;
			let state;
			if (this.currentStates[feature] !== undefined) {
				// CSS state exists, use it
				state = this.currentStates[feature];
			} else {
				// No CSS state yet, create one based off default state
				this.currentStates[feature] = 1;
				state = 1;
			}
			return `font-feature-settings:"${feature}" ${
				state ? onState : offState
			};`;
		},
	},
};
