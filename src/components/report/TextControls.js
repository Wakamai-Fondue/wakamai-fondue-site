export default {
	props: ["font"],
	data() {
		return {
			fontSize: 24,
			textAlign: "left",
			activeLanguage: null,
			languages: this.font.languageSystems
		};
	},
	computed: {
		hasLocalization() {
			return this.font.languageSystems.length > 0;
		}
	},
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
			return `font-size: ${this.fontSize}px;\ntext-align: ${this.textAlign};`;
		},
		setLanguage: function(language) {
			this.$emit("updateLanguage", language);
		}
	}
};
