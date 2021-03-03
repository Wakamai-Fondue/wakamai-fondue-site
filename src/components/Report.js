import Summary from "./report/Summary.vue";
import Tester from "./report/Tester.vue";
import Color from "./report/Color.vue";
import Variable from "./report/Variable.vue";
import Features from "./report/Features.vue";
import CharGrid from "./report/CharGrid.vue";
import Stylesheet from "./report/Stylesheet.vue";
import Footer from "./Footer.vue";

export default {
	props: ["font", "isExamplefont", "isGooglefont"],
	components: {
		Summary,
		Tester,
		Color,
		Variable,
		Features,
		CharGrid,
		Stylesheet,
		Footer
	}
};
