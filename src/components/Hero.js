import toggleModal from "../mixins/toggleModal.js";
import Filedrop from "./Filedrop.vue";

export default {
	mixins: [toggleModal],
	props: ["error"],
	components: {
		Filedrop
	}
};
