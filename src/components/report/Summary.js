export default {
	props: ["font"],
	data() {
		return {
			summary: this.font.summary,
			features: this.font.features
		};
	},
	computed: {
		featureLength() {
			return Object.keys(this.features).length;
		}
	}
};
