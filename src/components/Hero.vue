<template>
	<header class="hero">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleModal"
		></button>
		<Filedrop :error="error" />
		<img src="../img/pixelambacht.svg" alt="" class="logo" />
	</header>
</template>

<script src="./Hero.js"></script>
<style src="./Hero.css" scoped></style>
