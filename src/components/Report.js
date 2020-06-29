import Summary from "./report/Summary.vue";
import Tester from "./report/Tester.vue";
import Features from "./report/Features.vue";

export default {
	props: ["font"],
	components: {
		Summary,
		Tester,
		Features
	}
};
