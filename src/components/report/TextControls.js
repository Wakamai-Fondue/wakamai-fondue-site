export default {
	props: ["font"],
	data() {
		return {
			fontSize: 24,
			textAlign: "left",
			activeLanguage: null,
			languages: this.font.languageSystems,
			linkOpticalSize: false
		};
	},
	computed: {
		hasLocalization() {
			return this.font.languageSystems.length > 0;
		},
		hasOpticalSize() {
			return (
				this.font.variable !== undefined &&
				this.font.variable.axes.find(o => o.id === "opsz") !== undefined
			);
		}
	},
	mounted: function() {
		this.$root.$on("unlinkOpticalSize", this.unlinkOpticalSize);
		this.updateStyles();
	},
	methods: {
		align: function(alignment) {
			this.textAlign = alignment;
			this.updateStyles();
		},
		updateStyles: function() {
			this.$emit("updateTextStyles", this.getTextStyles());
			if (this.hasOpticalSize && this.linkOpticalSize) {
				this.$root.$emit("updateOpticalSize", this.fontSize);
			}
		},
		getTextStyles: function() {
			return `font-size: ${this.fontSize}px;\ntext-align: ${this.textAlign};`;
		},
		setLanguage: function(language) {
			this.$emit("updateLanguage", language);
		},
		toggleOpticalSizeLink() {
			this.linkOpticalSize = !this.linkOpticalSize;
			this.updateStyles();
		},
		unlinkOpticalSize: function() {
			this.linkOpticalSize = false;
		}
	}
};
