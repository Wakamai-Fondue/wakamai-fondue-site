// TODO: Font.js can be defered/lazy loaded, as it will only
// be needed after user "uploads" a font
// TODO: deal with multiple fonts
import "./lib/Font.js/Font.js";
import Hero from "./components/Hero.vue";
import Report from "./components/Report.vue";

export default {
	created: function() {
		if (window.location.pathname == "/bungee") {
			this.getExampleFont("Bungee-Regular.ttf");
			document.getElementById("report").scrollIntoView();
		}
	},
	components: {
		Hero,
		Report
	},
	data: () => ({
		font: false,
		dragging: false
	}),
	methods: {
		getFont(e) {
			e.preventDefault();
			this.dragging = false;

			const that = this;

			// Loop over all uploaded files
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach(file => {
				const filename = file.name;
				that.loadFont(file, filename, that);
			});
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
		loadFont(file, filename, that) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function() {
				const filedata = reader.result;
				const font = new window.Font(filename);
				font.loadFont(filedata, filename);
				font.onload = e => {
					that.injectStyleSheet(file);
					that.font = e.detail.font;
					that.$nextTick(() =>
						document.getElementById("report").scrollIntoView()
					);
					window.font = e.detail.font; // DEV DEBUG ONLY !!
				};
				font.onerror = function(error) {
					// TODO: error handling
					console.log(error);
				};
			};
			reader.onerror = function(error) {
				// TODO: error handling
				console.log(error);
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
