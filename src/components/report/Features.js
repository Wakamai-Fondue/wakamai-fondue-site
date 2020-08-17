export default {
	props: ["font"],
	data: () => ({
		chars: ["a", "b", "c", "d", "e", "f"],
		on: true,
		requiredFeatures: true,
		optionalFeatures: true
	}),
	computed: {
		features() {
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
	},
	methods: {
		flipState(feature) {
			this.features[feature] = 1 - this.features[feature];
		}
	}
};
