// This is visual element that lets users drag and drop
// or click to upload a font. The actual font gets
// "uploaded" and converted to a JS object in App.js

export default {
	props: ["error"],
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
		}
	}
};
