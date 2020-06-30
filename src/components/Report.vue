<template>
	<section v-if="font" class="report" id="report">
		<Summary :font="font" />
		<Tester :font="font" />
		<Features :font="font" />
		<Charset :font="font" />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
