<template>
	<header class="fondue">
		<picture>
			<source srcset="@/assets/fondue.avif" type="image/avif" />
			<source srcset="@/assets/fondue.webp" type="image/webp" />
			<img src="@/assets/fondue.jpg" alt="" />
		</picture>
		<button
			type="button"
			aria-label="Info"
			class="info circle-background"
			@click="toggleInfoModal"
		>
			<svg viewBox="0 0 57 57">
				<path
					d="M25.4 19.6q0 3.3-2.5 5.3a9 9 0 0 1-6.2 2.2q-4.6 0-7-3C7.1 21 7 19.7 7 16.4Q7 12 9.9 8.1q2.8-3.6 7.6-5.8T29 0q7.5 0 10.9 1.4Q43.3 3 44 6.7q.6 3 1.7 4.8l1.8 2.8q1 1 1.4 2 .7.9.6 2.4 0 3-2.1 4.4a13 13 0 0 1-5.8 2.1q-3.7.6-8.1 1-2.5.3-3.8.7-1.5.6-1.5 1.6 0 .6.5 1t1.4.3c1-.1.8 0 1.1-.2l.8-.1q1 0 1.5.4t.4 1.7-.7 2.7-2.4 2.4a6 6 0 0 1-3.5 1q-2.7 0-4-1.4c-1.3-1.4-1.2-2-1.2-3.3q0-2.1 1.2-3.8t3.4-3.4l4-3.3q1.8-1.7 3.3-3.5 1.3-2 1.3-4.3 0-3.6-1.7-6a14 14 0 0 0-4.6-4q-2.6-1.3-6-1.3-3.9 0-5.5 1.8t-1.7 5.4q0 2.8 1.1 4.3c1.1 1.5 1.5 1.4 2.7 1.4a5 5 0 0 0 2.2-.4q.7-.5 1.6-.5 2 0 2 4.2m8.8 32.6q-1.4 1.9-3.4 3.2a7 7 0 0 1-3.6 1.3q-1.7 0-3.7-1.3-1.8-1.3-3.4-3.2a6 6 0 0 1-1.4-3.6q0-1.8 1.3-3.7 1.3-1.8 3.4-3 2-1.5 4-1.4c2 .1 2.5.5 3.9 1.3a14 14 0 0 1 3.3 3.1 7 7 0 0 1 1.3 3.7 9 9 0 0 1-1.7 3.6"
				/>
			</svg>
		</button>
		<FileDrop
			:error="error"
			@getFont="$emit('getFont', $event)"
			@getExampleFont="$emit('getExampleFont', $event)"
		/>
		<a
			href="https://pixelambacht.nl"
			target="_blank"
			class="logo"
			aria-label="PixelAmbacht"
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
	height: 100vh;
}

.fondue picture {
	position: absolute;
	inset: 0;
	overflow: hidden;
}

.fondue picture img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.logo {
	position: absolute;
	left: 1.5vw;
	top: 1.5vw;
	width: 12.5vw;
	max-width: 10rem;
	z-index: 10;
}

.info {
	position: absolute;
	z-index: 20;
	right: 1.5vw;
	top: 1.25vw;
	display: grid;
	place-items: center;
	width: 3rem;
	height: 3rem;
	border: 0;
	outline: 0;
	cursor: pointer;
	animation: woooo 2s linear infinite alternate both;
}

.info svg {
	width: 2rem;
	height: 2rem;
	fill: var(--red);
}

@keyframes woooo {
	from {
		rotate: -10deg;
	}
	to {
		rotate: 10deg;
	}
}
</style>
