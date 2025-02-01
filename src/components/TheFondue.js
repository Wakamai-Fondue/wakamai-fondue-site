import toggleInfoModal from "@/mixins/toggleInfoModal.js";
import FileDrop from "./FileDrop.vue";

export default {
	mixins: [toggleInfoModal],
	props: ["error"],
	components: {
		FileDrop,
	},
};
