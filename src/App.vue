<template>
	<main id="app" @drop.prevent="grabFont" @dragover.prevent="drag">
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
