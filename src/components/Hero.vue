<template>
	<header class="hero">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleModal"
		></button>
		<Filedrop :error="error" />
		<a href="https://pixelambacht.nl" target="_blank" class="logo"
			><img src="../assets/pixelambacht.svg" alt=""
		/></a>
	</header>
</template>

<script src="./Hero.js"></script>
<style src="./Hero.css" scoped></style>
