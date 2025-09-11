export default {
	props: ["font", "linkOpticalSize"],
	data() {
		return {
			fontSize: 24,
			textAlign: "initial",
			activeLanguage: null,
			languages: this.font.languageSystems,
		};
	},

	mounted: function () {
		this.updateStyles();
	},
	methods: {
		align: function (alignment) {
			this.textAlign = alignment;
			this.updateStyles();
		},
		updateStyles: function () {
			this.$emit("updateTextStyles", this.getTextStyles());
			if (this.font.hasOpticalSize && this.linkOpticalSize) {
				this.$emit("updateOpticalSize", this.fontSize);
			}
		},
		getTextStyles: function () {
			return `font-size: ${this.fontSize}px;\ntext-align: ${this.textAlign};`;
		},
		setLanguage: function (language) {
			this.$emit("updateLanguage", language);
		},
		unlinkOpticalSize: function () {
			this.$emit("unlinkOpticalSize", !this.linkOpticalSize);
		},
	},
};
