export default {
	props: ["font"],
	computed: {
		summary: function() {
			return this.font.summary;
		},
		features: function() {
			return this.font.features;
		},
		fontFormat: function() {
			return "hello";
		}
	},
	methods: {
		featureLength() {
			return Object.keys(this.features).length;
		}
	}
};
