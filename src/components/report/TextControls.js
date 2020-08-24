export default {
	data: () => ({
		fontSize: 24,
		textAlign: "left"
	}),
	mounted: function() {
		this.updateStyles();
	},
	methods: {
		align: function(alignment) {
			this.textAlign = alignment;
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateTextStyles", this.getTextStyles());
		},
		getTextStyles: function() {
			return `font-size:${this.fontSize}px;
					text-align:${this.textAlign};`;
		}
	}
};
