<template>
	<footer>
		A tool by
		<br />
		<br />
		<a
			href="https://pixelambacht.nl"
			target="_blank"
			aria-label="PixelAmbacht"
		>
			<img src="@/assets/pixelambacht.svg" alt="PixelAmbacht logo" />
		</a>
		<p>
			<a href="https://pixelambacht.nl" target="_blank"
				>© PixelAmbacht {{ new Date().getFullYear() }} — Made by Roel
				Nieskens</a
			>
		</p>
	</footer>
</template>

<style scoped>
footer {
	background: black;
	color: #dfd6b3;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 16rem;
	margin-top: 8rem;
}

footer img {
	width: 16rem;
	margin-bottom: 2rem;
}

footer a {
	text-decoration: none;
	color: inherit;
}
</style>
