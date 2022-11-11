import Prism from "vue-prism-component";
import CopyToClipboard from "../CopyToClipboard.vue";

export default {
	props: ["font", "isGooglefont"],
	components: {
		Prism,
		CopyToClipboard
	},
	data() {
		return {
			fontname: this.font.summary["Font name"]
		};
	},
	computed: {
		css() {
			const exclude = this.isGooglefont ? "font-face" : "";
			return this.font.fontCSS(exclude);
		},

		googleFontCSS() {
			let css = "";
			css += `<link rel="preconnect" href="https://fonts.gstatic.com">\n`;
			css += `<link href="${this.isGooglefont}" rel="stylesheet">`;
			return css;
		}
	},
	methods: {
		getFontCSSLink: function() {
			const filename = `${this.font.slug}-wakamai-fondue.css`;
			let temp = document.createElement("a");
			temp.setAttribute(
				"href",
				"data:text/plain;charset=utf-8," +
					encodeURIComponent(this.font.cssString)
			);
			temp.setAttribute("download", filename);

			if (document.createEvent) {
				let event = document.createEvent("MouseEvents");
				event.initEvent("click", true, true);
				temp.dispatchEvent(event);
			} else {
				temp.click();
			}
		}
	}
};
