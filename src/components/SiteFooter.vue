<template>
	<footer>
		A tool by
		<a
			href="https://pixelambacht.nl"
			target="_blank"
			aria-label="PixelAmbacht"
		>
			<img src="@/assets/pixelambacht.svg" alt="PixelAmbacht" />
		</a>
		<button type="button" class="button on" @click="toggleInfoModal">
			Get in touch or report an issue
		</button>
		<p>
			<a href="https://pixelambacht.nl" target="_blank"
				>© PixelAmbacht {{ new Date().getFullYear() }} — Made by Roel
				Nieskens</a
			>
		</p>
	</footer>
</template>

<script>
export default {
	emits: ["toggleInfoModal"],
	methods: {
		toggleInfoModal() {
			this.$emit("toggleInfoModal");
		},
	},
};
</script>

<style scoped>
footer {
	background: black;
	color: var(--offwhite);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 8rem;
	padding: 4rem 0;
}

footer img {
	width: 12rem;
	margin: 2rem;
}

footer a {
	text-decoration: none;
	color: inherit;
}

footer p {
	margin-top: 2rem;
}
</style>
