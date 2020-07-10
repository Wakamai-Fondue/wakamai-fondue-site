<template>
	<section v-if="font" class="report" id="report">
		<Summary :summary="font.summary" :features="font.features" />
		<Tester :font="font" />
		<Color :font="font" />
		<Variable v-if="font.variables" :variables="font.variables" />
		<Features :font="font" />
		<Charset v-if="font.variables" :variables="font.variables" />
		<Footer />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
