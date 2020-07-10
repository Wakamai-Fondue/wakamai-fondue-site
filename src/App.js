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
		loadFondue(data, file, key, that) {
			loadFondue(data, file.name).then(fondue => {
				that.injectStyleSheet(file, key);
				that.font = fondue;
				console.log(that.font);
				that.$nextTick(() =>
					document.getElementById("report").scrollIntoView()
				);
				window.font = fondue; // DEV DEBUG ONLY !!
			});
		},
		getFont(e) {
			e.preventDefault();
			this.dragging = false;

			const that = this;

			// Loop over all uploaded files
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach((file, key) => {
				// Convert file to base64 string...
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function() {
					// ...and try to pass to Font.js
					that.loadFondue(reader.result, file, key, that);
				};
				reader.onerror = function(error) {
					// TODO: error handling
					console.log(error);
				};
			});
		},
		loadFont(file, filename, that) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function() {
				const filedata = reader.result;
				that.loadFondue(filedata, file, null, that);
				// const font = new window.Font(filename);
				// font.loadFont(filedata, filename);
				// font.onload = e => {
				// 	that.injectStyleSheet(file);
				// 	that.font = e.detail.font;
				// 	that.$nextTick(() =>
				// 		document.getElementById("report").scrollIntoView()
				// 	);
				// 	window.font = e.detail.font; // DEV DEBUG ONLY !!
				// };
				reader.onerror = function(error) {
					// TODO: error handling
					console.log(error);
				};
			};
		},
		getExampleFont(filename) {
			const that = this;

			// Grab font from server
			const request = new XMLHttpRequest();
			request.open("GET", `/${filename}`, true);
			request.responseType = "blob";
			request.send();

			request.onload = function() {
				const file = request.response;
				that.loadFont(file, filename, that);
			};
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
