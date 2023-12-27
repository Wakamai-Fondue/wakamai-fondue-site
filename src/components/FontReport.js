import FontSummary from "./report/FontSummary.vue";
import TypeTester from "./report/TypeTester.vue";
import ColorFont from "./report/ColorFont.vue";
import VariableFont from "./report/VariableFont.vue";
import OpenTypeFeatures from "./report/OpenTypeFeatures.vue";
import CharGrid from "./report/CharGrid.vue";
import StyleSheet from "./report/StyleSheet.vue";
import SiteFooter from "./SiteFooter.vue";

export default {
	props: ["font", "isExamplefont"],
	components: {
		FontSummary,
		TypeTester,
		ColorFont,
		VariableFont,
		OpenTypeFeatures,
		CharGrid,
		StyleSheet,
		SiteFooter
	}
};
