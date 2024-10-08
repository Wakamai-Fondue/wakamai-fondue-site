<template>
  <section v-if="font" class="report" id="report">
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

<script src="./FontReport.js"></script>
<style src="./FontReport.css" scoped></style>
