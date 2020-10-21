import Filedrop from "./Filedrop.vue";

export default {
	props: ["error"],
	components: {
		Filedrop
	},
	methods: {
		toggleModal() {
			// Quick and clean way to emit to grandparent
			// that modal should be opened/closed
			let vm = this;
			while (vm) {
				vm.$emit("toggleModal");
				vm = vm.$parent;
			}
		}
	}
};
