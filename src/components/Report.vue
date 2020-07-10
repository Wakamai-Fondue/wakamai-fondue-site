<template>
	<section v-if="font" class="report" id="report">
		<Summary :summary="font.summary" :features="font.features" />
		<Tester :font="font" />
		<Color :font="font" />
		<Variable :font="font" />
		<Features :font="font" />
		<Charset :font="font" />
		<Footer />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
