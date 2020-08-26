export default {
	props: ["font"],
	data() {
		return {
			summary: this.font.summary,
			features: this.font.features,
			numCharacters: this.font.supportedCharacters.length
		};
	},
	computed: {
		featureLength() {
			return Object.keys(this.features).length;
		}
	}
};
