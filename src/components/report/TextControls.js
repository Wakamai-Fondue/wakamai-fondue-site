export default {
	data: () => ({
		fontSize: 24,
		textAlign: "left",
		activeLanguage: null,
		// TODO: get this from engine
		// Font will contain the OT tags (keys here_
		// the html + name are added from the ot-to-html-lang.json file
		languages: {
			AZE: {
				html: "azj",
				name: "Azerbaijani"
			},
			CAT: {
				html: "ca",
				name: "Catalan"
			},
			MOL: {
				html: "ro-MD",
				name: "Romanian; Moldova"
			},
			NKO: {
				html: "nqo",
				name: "N\u2019Ko"
			}
		}
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
			return `font-size: ${this.fontSize}px;
					text-align: ${this.textAlign};`;
		},
		setLanguage: function(language) {
			this.$emit("updateLanguage", language);
		}
	}
};
