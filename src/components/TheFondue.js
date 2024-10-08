import toggleModal from "../mixins/toggleModal.js";
import FileDrop from "./FileDrop.vue";

export default {
	mixins: [toggleModal],
	props: ["error"],
	components: {
		FileDrop,
	},
};
