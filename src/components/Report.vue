<template>
	<section v-if="font" class="report" id="report">
		<!-- {{ font }} -->
		<Summary :font="font" />
		<Tester :font="font" />
	</section>
</template>

<script src="./Report.js"></script>
<style src="./Report.css" scoped></style>
