<template>
	<main
		id="app"
		@drop.prevent="grabFont"
		@dragover.prevent="dragging = true"
		@mouseout="dragging = false"
		:class="{ dragging }"
	>
		<!--
		<label>
			<input type="file" name="file" @change="grabFont" />
		</label>
		-->
		<Hero />
		<Report :font="font" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
