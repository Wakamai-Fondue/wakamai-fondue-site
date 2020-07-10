export default {
	props: ["summary", "features"],
	methods: {
		featureLength() {
			return Object.keys(this.features).length;
		}
	}
};
