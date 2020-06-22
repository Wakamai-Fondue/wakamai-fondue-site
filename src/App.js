// TODO: Font.js can be defered/lazy loaded, as it will only
// be needed after user "uploads" a font
import "./lib/Font.js/Font.js";
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
			this.dragging = false;
			const that = this; // Is this the way to update data?
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach((file, key) => {
				// Convert file to base64 string...
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function() {
					// ...and try to pass to Font.js
					const font = new window.Font(`font${key}`);
					font.loadFont(reader.result, file.name);
					font.onload = e => {
						that.font = e.detail.font;
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
			});
		}
	}
};
