import Prism from "vue-prism-component";

export default {
	props: ["font"],
	components: {
		Prism
	},
	data() {
		return {
			css: this.font.cssString
		};
	}
};
