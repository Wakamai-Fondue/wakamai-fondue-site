<template>
	<main
		id="app"
		@drop.prevent="grabFont"
		@dragover.prevent="dragging = true"
		@mouseout="dragging = false"
		:class="{ dragging }"
	>
		<Hero v-on:getFont="getFont" v-on:getExampleFont="getExampleFont" />
		<Report :font="font" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
