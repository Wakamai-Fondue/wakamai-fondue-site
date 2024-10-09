export default {
	methods: {
		toggleInfoModal() {
			// Quick and clean way to emit to grandparent
			// that modal should be opened/closed
			let vm = this;
			while (vm) {
				vm.$emit("toggleInfoModal");
				vm = vm.$parent;
			}
		},
	},
};
