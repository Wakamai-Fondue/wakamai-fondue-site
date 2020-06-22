<template>
	<main
		id="app"
		@drop.prevent="grabFont"
		v-on:poop="grabFont"
		@dragover.prevent="dragging = true"
		@mouseout="dragging = false"
		:class="{ dragging }"
	>
		<Hero v-on:filePickFont="grabFont" />
		<Report :font="font" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
