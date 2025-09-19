<template>
	<div class="modal">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleInfoModal"
		></button>
		<div class="modal-content">
			<p class="modal-title">Wakamai Fondue</p>
			<p class="version">Version 2.0</p>
			<hr />
			<p>
				<strong
					>Wakamai Fondue is a tool that answers the question “What
					can my font do?”</strong
				>
			</p>
			<p>
				Drop a font on it, or click the circle to upload one, and
				Wakamai Fondue will tell you about the features in the font. It
				will also give you all the CSS needed to actually use these
				features in your web projects!
			</p>
			<p>
				Everything is processed inside the browser—your font will not be
				sent to a server!
			</p>
			<hr />
			<p>
				A big thank you to these amazing folks for their advice,
				encouragement and time:
			</p>
			<p>
				Indra Kupferschmid, Bram Stein, Nick Sherman, David Jonathan
				Ross, Koen Kivits, Kenneth Ormandy, Zach Leatherman, Mike
				“Pomax” Kamermans, John Hudson, Robin Rendle, Pascal
				Widdershoven, Frank Grießhammer, Dave Crossland and Amelia
				Bellamy-Royds 💖
			</p>
			<hr />
			<p>
				Made by
				<a href="https://pixelambacht.nl" target="_blank"
					>Roel Nieskens/PixelAmbacht</a
				>
				using
				<a href="https://github.com/Pomax/lib-font" target="_blank"
					>LibFont</a
				>
				and
				<a href="https://vuejs.org/" target="_blank">Vue.js</a>
				. The logo is set in Eckmannpsych from
				<a href="http://www.ohnotype.co/" target="_blank"
					>OH no Type Co</a
				>. The rest of the site uses your default OS system font by... I
				don’t know. Drop it here and find out!
			</p>
			<p>
				Want to peek under the hood? All the code is on
				<a href="https://github.com/Wakamai-Fondue" target="_blank"
					>Github!</a
				>
			</p>
			<p>
				I appreciate all bug reports and questions.
				<a href="mailto:roel@pixelambacht.nl">Mail me</a>,
				<a
					href="https://github.com/Wakamai-Fondue/wakamai-fondue-site/issues"
					target="_blank"
				>
					submit an issue</a
				>, or
				<a href="https://twitter.com/pixelambacht" target="_blank"
					>tweet at me</a
				>!
			</p>
			<hr />
			<a
				href="https://pixelambacht.nl"
				target="_blank"
				aria-label="PixelAmbacht"
				class="logo-link"
			>
			</a>
		</div>
	</div>
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
.modal {
	background: var(--green);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	overflow: auto;
	z-index: 30; /* Must be above filedropper */
}

.modal-content {
	max-width: 36rem;
	margin: auto;
	padding: 1rem;
	color: white;
}

.modal-title {
	font-size: 4rem;
	margin: 0 0 0.75rem 0;
	line-height: 1;
	text-align: center;
}

.modal-content p {
	margin-bottom: 1.5rem;
	line-height: 1.45;
}

.modal-content a {
	color: inherit;
}

.modal-content .version {
	opacity: 0.5;
	text-align: center;
}

.modal-content hr {
	opacity: 0.25;
	border-style: dashed;
	margin: 1.5rem -1.5rem;
}

.logo-link {
	margin: 0 auto 3rem auto;
	display: block;
	width: 12rem;
	height: 5.5rem;
	background: white;
	mask-image: url("@/assets/pixelambacht.svg");
	mask-position: center;
	mask-repeat: no-repeat;
}

.info {
	position: fixed;
	z-index: 100;
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
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 32'%3E%3Cpath fill='%23cd4e49' d='M8.4 14.4c-.7-.6-1.6-1.2-2.6-1.8-1.1-.6-2.2-1.2-3.4-1.8-.9-.5-1.5-.9-1.9-1.2-.3-.4-.5-.9-.5-1.5 0-.3.1-.6.2-.9.2-.3.4-.6.8-1 .8-.6 1.3-1.2 1.7-1.7.3-.6.9-.8 1.5-.8s1.1.3 1.5.7c.5.5.9 1.1 1.3 1.8 1.5 2.4 2.6 4.1 3.3 5.2s1.4 1.6 2.2 1.6s1.4-.5 2.2-1.6s1.8-2.8 3.3-5.2c.4-.7.8-1.3 1.3-1.8s1-.7 1.5-.7c.7 0 1.2.3 1.6.8.4.5.9 1.1 1.6 1.8.4.4.7.7.8 1 .1.2.2.5.2.8 0 .6-.2 1.1-.5 1.4-.4.3-1 .7-1.9 1.2-1.2.6-2.3 1.2-3.4 1.8-1.1.6-2 1.2-2.6 1.8-.7.6-1 1.1-1 1.6s.3 1.1 1 1.6c.7.6 1.6 1.2 2.6 1.8 1.1.6 2.2 1.2 3.4 1.8.9.5 1.5.9 1.9 1.2.4.3.5.8.5 1.4 0 .3-.1.6-.2.9-.2.3-.4.6-.8 1-.7.7-1.3 1.3-1.6 1.8-.4.5-.9.8-1.6.8-.6 0-1.1-.2-1.5-.7-.5-.5-.9-1.1-1.3-1.8-1.5-2.4-2.6-4.1-3.3-5.2-.7-1.1-1.4-1.6-2.2-1.6s-1.4.5-2.2 1.6c-.7 1.1-1.8 2.8-3.3 5.2-.4.7-.8 1.3-1.3 1.8s-1 .7-1.5.7c-.7 0-1.2-.3-1.6-.8-.4-.5-.9-1.1-1.6-1.8-.4-.4-.7-.7-.8-1-.1-.1-.2-.4-.2-.7 0-.6.2-1.1.5-1.4.4-.3 1-.7 1.9-1.2 1.2-.6 2.3-1.2 3.4-1.8 1.1-.6 2-1.2 2.6-1.8.7-.6 1-1.1 1-1.6.1-.6-.3-1.2-1-1.7z'/%3E%3C/svg%3E");
	background-position: center;
	background-repeat: no-repeat;
	background-size: 45%;
	cursor: pointer;
}
</style>
