// TODO: Font.js can be defered/lazy loaded, as it will only
// be needed after user "uploads" a font
// TODO: deal with multiple fonts
import loadFondue from "fondue";
import Hero from "./components/Hero.vue";
import Report from "./components/Report.vue";

export default {
	components: {
		Hero,
		Report
	},
	data: () => ({
		font: false,
		dragging: false
	}),
	methods: {
		grabFont(e) {
			e.preventDefault();
			const that = this; // Is this the best way to deal with context?

			// Turn off drag feedback
			this.dragging = false;

			// Loop over all files
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach((file, key) => {
				// Convert file to base64 string...
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function() {
					// ...and try to pass to Font.js
					loadFondue(reader.result, file.name).then(fondue => {
						that.injectStyleSheet(file, key);
						that.font = fondue;
						console.log(that.font);
						that.$nextTick(() =>
							document.getElementById("report").scrollIntoView()
						);
						window.font = fondue; // DEV DEBUG ONLY !!
					});
					// const font = new window.Font(`font${key}`);
					// font.loadFont(reader.result, file.name);
					// font.onload = e => {
					// 	that.injectStyleSheet(file, key);
					// 	that.font = e.detail.font;
					// 	that.$nextTick(() =>
					// 		document.getElementById("report").scrollIntoView()
					// 	);
					// 	window.font = e.detail.font; // DEV DEBUG ONLY !!
					// };
					// font.onerror = function(error) {
					// 	// TODO: error handling
					// 	console.log(error);
					// };
				};
				reader.onerror = function(error) {
					// TODO: error handling
					console.log(error);
				};
			});
		},
		injectStyleSheet(file) {
			// Use the "uploaded" font on the page
			const id = "wakamai-fondue-custom-stylesheet";
			let style = document.getElementById(id);

			// Clean up previous instance of stylesheet
			if (!style) {
				style = document.createElement("style");
				style.id = id;
				document.head.appendChild(style);
			}

			// Inject new stylesheet
			const objectURL = URL.createObjectURL(file);
			style.innerHTML = "";
			style.appendChild(
				document.createTextNode(
					`@font-face { font-family: 'wakamai-fondue'; src: url('${objectURL}'); }`
				)
			);
		}
	}
};
