/*
  TODO: Font.js can be defered/lazy loaded, as it will only
		be needed after user "uploads" a font
*/
import "./lib/Font.js/Font.js";

export default {
	methods: {
		drag() {
			// TODO: drag feedback
			console.log("Dragging...");
		},
		grabFont(e) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files) return;
			[...files].forEach((file, key) => {
				// Covert file to base64 string...
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function() {
					// ...and try to pass to Font.js
					const font = new window.Font(`font${key}`);
					font.loadFont(reader.result, file.name);
					font.onload = e => {
						console.log(e.detail.font.opentype.tables);
					};
				};
				reader.onerror = function(error) {
					console.log(error);
				};
			});
		}
	}
};
