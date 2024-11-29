<template>
	<header class="fondue">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleInfoModal"
		></button>
		<FileDrop :error="error" />
		<a href="https://pixelambacht.nl" target="_blank" class="logo"
			><img src="../assets/pixelambacht.svg" alt=""
		/></a>
	</header>
</template>

<script src="./TheFondue.js"></script>
<style src="./TheFondue.css" scoped></style>
