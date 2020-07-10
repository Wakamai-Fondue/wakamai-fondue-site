export default {
	props: ["summary", "features"],
	data() {
		return {
			featureLength: Object.keys(this.features).length
		};
	}
};
