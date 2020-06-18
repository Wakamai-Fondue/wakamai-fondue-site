<template>
	<main id="app" @drop.prevent="grabFont" @dragover.prevent="drag">
		<label>
			<input type="file" name="file" @change="grabFont" />
		</label>
		<h1>Wakamai Fondue?!</h1>
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css" scoped></style>
