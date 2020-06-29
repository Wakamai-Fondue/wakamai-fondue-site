export default {
	props: ["font"],
	data() {
		return {
			features: this.getStates(),
			chars: ["a", "b", "c", "d", "e", "f"],
			on: true,
			requiredFeatures: true,
			optionalFeatures: true
		};
	},
	methods: {
		flipState(feature) {
			this.features[feature] = 1 - this.features[feature];
		},
		getStates: function() {
			// TODO: use actual features from font, duh
			//       and set them all to 1
			//       Example: { "smcp": 1, "salt": 1 }
			const features = ["smcp", "salt", "ss01"];
			const states = {};
			for (let feature of features) {
				states[feature] = 1;
			}
			return states;
		}
	}
};
