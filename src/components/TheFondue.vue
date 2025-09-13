<template>
	<header class="fondue">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleInfoModal"
		></button>
		<FileDrop
			:error="error"
			@getFont="$emit('getFont', $event)"
			@getExampleFont="$emit('getExampleFont', $event)"
		/>
		<a href="https://pixelambacht.nl" target="_blank" class="logo"
			><img src="@/assets/pixelambacht.svg" alt=""
		/></a>
	</header>
</template>

<script>
import FileDrop from "./FileDrop.vue";

export default {
	props: ["error"],
	emits: ["getFont", "getExampleFont", "toggleInfoModal"],
	components: {
		FileDrop,
	},
	methods: {
		toggleInfoModal() {
			this.$emit("toggleInfoModal");
		},
	},
};
</script>

<style scoped>
.fondue {
	position: relative;
	background: url("@/assets/fondue.jpg") center;
	background-size: cover;
	height: 100vh;
}

.logo {
	position: absolute;
	left: 1.5vw;
	top: 1.5vw;
	width: 12.5vw;
	z-index: 10;
}

.info {
	position: absolute;
	z-index: 20;
	right: 1.5vw;
	top: 1.5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	border: 0;
	outline: 0;
	background: var(--offwhite);
	background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30.3 40'%3e%3cpath fill='%23cd4e49' d='M13 13.8c0 1.6-.6 2.8-1.8 3.8-1.2 1-2.7 1.5-4.4 1.5-2.1 0-3.8-.7-5-2.1S0 13.9 0 11.6c0-2.2.7-4.1 2-5.9C3.3 4 5.1 2.6 7.4 1.6s5-1.6 8.1-1.6c3.5 0 6.1.3 7.7 1 1.7.7 2.7 1.9 3.1 3.7.3 1.4.7 2.6 1.2 3.4.4.8.9 1.5 1.3 2s.8 1 1 1.4c.3.4.4 1 .4 1.7 0 1.4-.5 2.4-1.5 3.1-1 .7-2.4 1.2-4.1 1.5-1.7.3-3.7.5-5.8.7-1.1.1-2.1.3-2.7.5-.7.3-1 .6-1 1.1 0 .3.1.5.3.7.2.2.6.2 1 .2s.6 0 .8-.1c.2-.1.3-.1.6-.1.4 0 .8.1 1 .3s.3.6.3 1.2-.1 1.3-.5 1.9c-.4.7-.9 1.3-1.7 1.7-.7.5-1.6.7-2.5.7-1.3 0-2.2-.3-2.8-1-.6-.7-.9-1.4-.9-2.3 0-1 .3-1.9.9-2.7.6-.8 1.4-1.6 2.4-2.4s1.9-1.5 2.8-2.3c.9-.8 1.7-1.6 2.4-2.5.6-.9.9-1.9.9-3 0-1.7-.4-3.1-1.2-4.3-.9-1.1-1.9-2-3.3-2.7-1.3-.7-2.8-1-4.4-1-1.8 0-3.1.4-3.9 1.3-.8.8-1.2 2.1-1.2 3.8 0 1.3.3 2.3.8 3 .5.7 1.1 1 1.9 1 .7 0 1.2-.1 1.6-.3.3-.2.7-.3 1.1-.3 1 0 1.5 1 1.5 2.9zm6.2 23c-.7.9-1.5 1.7-2.4 2.3-.9.6-1.8.9-2.6.9s-1.7-.3-2.6-.9-1.7-1.4-2.4-2.3c-.7-.9-1-1.7-1-2.5 0-.9.3-1.7.9-2.6.6-.9 1.4-1.6 2.4-2.2.9-.6 1.9-.9 2.8-.9.9 0 1.8.3 2.8.9.9.6 1.7 1.3 2.4 2.2.6.9.9 1.7.9 2.6-.2.8-.5 1.6-1.2 2.5z'/%3e%3c/svg%3e");
	background-position: center;
	background-repeat: no-repeat;
	background-size: 45%;
	cursor: pointer;
}
</style>
