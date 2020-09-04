<template>
	<section v-if="font" class="report" id="report">
		<Summary :font="font" />
		<Tester :font="font" />
		<Color v-if="font.isColor" :font="font" />
		<Variable v-if="font.isVariable" :font="font" />
		<Features v-if="font.hasFeatures" :font="font" />
		<CharGrid :font="font" />
		<Footer />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
