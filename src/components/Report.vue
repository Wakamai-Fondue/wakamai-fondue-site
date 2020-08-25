<template>
	<section v-if="font" class="report" id="report">
		<Summary :font="font" />
		<Tester v-if="font.isVariable" :font="font" />
		<Color :font="font" />
		<Variable v-if="font.isVariable" :font="font" />
		<Features :font="font" />
		<Charset v-if="font.isVariable" :font="font" />
		<Footer />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
