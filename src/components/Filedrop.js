// This is visual element that lets users drag and drop
// or click to upload a font. The actual font gets
// "uploaded" and converted to a JS object in App.js

export default {
	methods: {
		filePickFont(e) {
			// Quick and clean way to emit to grandparent
			// that a file has been picked
			let vm = this.$parent;
			while (vm) {
				vm.$emit("filePickFont", e);
				vm = vm.$parent;
			}
		}
	}
};
