import googleFonts from "../assets/gfcss.json";

// This is visual element that lets users drag and drop
// or click to upload a font. The actual font gets
// "uploaded" and converted to a JS object in App.js
export default {
	props: ["error"],
	data() {
		return {
			googleFonts: googleFonts
		};
	},
	computed: {
		expandedGoogleFonts() {
			let gf = {};
			for (const family in googleFonts) {
				for (const subset of googleFonts[family].subsets) {
					gf[`${family} (${subset})`] = {
						css: googleFonts[family].css,
						subset: subset
					};
				}
			}
			return gf;
		}
	},
	methods: {
		getFont(e) {
			// Quick and clean way to emit to grandparent
			// that a file has been picked
			let vm = this;
			while (vm) {
				vm.$emit("getFont", e);
				vm = vm.$parent;
			}
		},
		getExampleFont(filename) {
			// Quick and clean way to emit to grandparent
			// that a file has been picked
			let vm = this;
			while (vm) {
				vm.$emit("getExampleFont", filename);
				vm = vm.$parent;
			}
		},
		loadGoogleFont(font) {
			// Quick and clean way to emit to grandparent
			// that a file has been picked
			let vm = this;
			while (vm) {
				vm.$emit("getGoogleFont", this.expandedGoogleFonts[font]);
				vm = vm.$parent;
			}
		}
	}
};
