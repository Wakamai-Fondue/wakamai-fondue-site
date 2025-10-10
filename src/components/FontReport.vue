<template>
	<section v-if="font" class="report" id="report">
		<PreviewFontSizeControl />
		<FontSummary :font="font" :isExamplefont="isExamplefont" />
		<TypeTester :font="font" />
		<ColorFont v-if="font.isColor" :font="font" />
		<VariableFont v-if="font.isVariable" :font="font" />
		<OpenTypeFeatures v-if="font.hasFeatures" :font="font" />
		<CharGrid :font="font" />
		<StyleSheet :font="font" />
		<SiteFooter />
	</section>
</template>

<script>
import FontSummary from "./report/FontSummary.vue";
import TypeTester from "./report/TypeTester.vue";
import ColorFont from "./report/ColorFont.vue";
import VariableFont from "./report/VariableFont.vue";
import OpenTypeFeatures from "./report/OpenTypeFeatures.vue";
import CharGrid from "./report/CharGrid.vue";
import StyleSheet from "./report/StyleSheet.vue";
import SiteFooter from "./SiteFooter.vue";
import PreviewFontSizeControl from "./PreviewFontSizeControl.vue";

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
		SiteFooter,
		PreviewFontSizeControl
	},
	updated() {
		if (this.font) {
			document.getElementById("report")?.scrollIntoView();
		}
	},
};
</script>
