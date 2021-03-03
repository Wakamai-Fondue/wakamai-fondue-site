import { fromDataBuffer } from "@wakamai-fondue/engine";
import Hero from "./components/Hero.vue";
import Report from "./components/Report.vue";
import Modal from "./components/Modal.vue";

export default {
	components: {
		Hero,
		Report,
		Modal
	},
	data() {
		return {
			font: false,
			dragging: false,
			working: false,
			error: false,
			showModal: false,
			isExamplefont: false,
			isGooglefont: false
		};
	},
	methods: {
		dragStatus(status) {
			this.dragging = status;
			if (status) {
				// If a new file is being dragged, remove any
				// old error messages so we don't confuse the user
				this.error = false;
			}
		},
		loadFondue(fileOrBlob, data, fileName, that) {
			// Destroy old font prop so Vue picks up change
			that.font = false;
			fromDataBuffer(data, fileName)
				.then(fondue => {
					that.error = false;
					that.injectStyleSheet(fileOrBlob);
					that.font = fondue;
					that.$nextTick(() => {
						that.working = false;
						document.getElementById("report").scrollIntoView();
					});
				})
				.catch(function() {
					that.error = true;
				});
		},
		getFont(e) {
			this.working = true;

			e.preventDefault();
			this.dragging = false;
			this.isExamplefont = false;
			this.isGooglefont = false;

			const that = this;

			// Loop over all uploaded files
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach(file => {
				this.loadFont(file, file.name, that);
			});
		},
		loadFont(fileOrBlob, filename, that) {
			const reader = new FileReader();

			reader.onload = function() {
				const data = reader.result;
				that.loadFondue(fileOrBlob, data, filename, that);
			};

			reader.onerror = function(error) {
				// TODO: error handling
				// eslint-disable-next-line no-console
				console.log(error);
			};

			reader.readAsArrayBuffer(fileOrBlob);
		},
		getExternalFont(filename) {
			this.working = true;

			// Grab font from server
			const request = new XMLHttpRequest();
			request.open("GET", `${filename}`, true);
			request.responseType = "blob";
			request.send();

			const that = this;
			request.onload = function() {
				const blob = request.response;
				that.loadFont(blob, filename, that);
			};
		},
		getExampleFont(font) {
			this.isExamplefont = true;
			this.getExternalFont(font);
		},
		getGoogleFont(googleFont) {
			this.isGooglefont = true;

			// Grab CSS for this font from Google Fonts
			const request = new XMLHttpRequest();
			request.open("GET", googleFont.css, true);
			request.send();

			const that = this;
			request.onload = function() {
				const fontLinks = that.parseGoogleFontCSS(request.response);
				that.getExternalFont(fontLinks[googleFont.subset]);
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
		},
		toggleModal(forceClose) {
			if (forceClose) {
				this.showModal = false;
			} else {
				this.showModal = !this.showModal;
			}
		},
		parseGoogleFontCSS(css) {
			const chunks = css.split("}\n");
			let links = {};
			for (const chunk of chunks) {
				const name = chunk
					.split("*/")[0]
					.replace("/*", "")
					.trim();
				if (!name) continue;
				const fontURL = chunk.split("src: url(")[1].split(")")[0];
				links[name] = fontURL;
			}
			return links;
		}
	}
};
