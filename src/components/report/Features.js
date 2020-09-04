export default {
	props: ["font"],
	data() {
		return {
			features: this.font.features,
			chars: ["a", "b", "c", "d", "e", "f"],
			currentStates: []
		};
	},
	computed: {
		optionalFeatures() {
			return this.features.filter(f => f.state !== "fixed");
		},
		requiredFeatures() {
			return this.features.filter(f => f.state === "fixed");
		},
		hasRequiredFeatures() {
			return this.optionalFeatures.length > 0;
		},
		hasOptionalFeatures() {
			return this.requiredFeatures.length > 0;
		}
	},
	methods: {
		flipState(feature) {
			this.currentStates[feature] = 1 - this.currentStates[feature];
		},
		getFeatureStyle: function(feature) {
			let state;
			if (this.currentStates[feature] !== undefined) {
				// CSS state exists, use it
				state = this.currentStates[feature];
			} else {
				// No CSS state yet, create one based off default state
				this.$set(this.currentStates, feature, 1);
				state = 1;
			}
			return `font-feature-settings:"${feature}" ${state ? "1" : "0"};`;
		}
	}
};
