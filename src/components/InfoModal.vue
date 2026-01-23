<template>
	<div class="modal">
		<button
			type="button"
			aria-label="Info"
			class="info circle-background"
			@click="toggleInfoModal"
		>
			<svg viewBox="0 0 57 57">
				<path
					d="M19 24.8a44 44 0 0 0-5.8-4.2l-7.8-4.2q-3-1.6-4.3-2.7A6 6 0 0 1 0 10.2Q0 9.2.5 8 1 7 2.3 5.7 5 3.7 6 1.8 7.3 0 9.5 0q2 .1 3.4 1.6 1.6 1.8 3 4.2l7.5 12q2.2 3.8 5 3.7c2.7 0 3.1-1.1 5-3.7s4-6.5 7.4-12q1.3-2.4 3-4.2C45.5-.2 46 0 47.2 0q2.3 0 3.6 1.9L54.4 6q1.5 1.4 1.8 2.3.5.8.5 1.9-.1 2.1-1.1 3.2l-4.4 2.8-7.7 4.2a27 27 0 0 0-5.9 4.1q-2.2 2-2.2 3.7c0 1.7.7 2.6 2.2 3.7a44 44 0 0 0 6 4.2l7.6 4.2q3 1.6 4.4 2.7 1.2 1.1 1 3.3 0 1-.4 2-.5 1.1-1.8 2.4-2.5 2.4-3.6 4.1-1.4 1.9-3.6 1.9a4 4 0 0 1-3.4-1.6q-1.7-1.8-3-4.2l-7.5-12q-2.3-3.8-5-3.7c-2.7 0-3.1 1.1-5 3.7l-7.4 12q-1.4 2.4-3 4.2c-1.6 1.8-2.2 1.6-3.4 1.6q-2.3 0-3.6-1.9l-3.6-4.1Q.8 49.3.5 48.4q-.5-.5-.5-1.7.1-2 1.1-3.2l4.3-2.8 7.8-4.1q3.7-2.1 5.8-4.2 2.4-2 2.3-3.7.2-2.1-2.3-4"
				/>
			</svg>
		</button>
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
				Widdershoven, Frank Grießhammer, Dave Crossland, Amelia
				Bellamy-Royds and André Jaenisch 💖
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
				<a
					rel="me"
					href="https://typo.social/@pixelambacht"
					target="_blank"
					>find me on the Fediverse</a
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
			<p class="ps">
				PS. If you have a hard time remembering
				<a href="https://wakamaifondue.com">wakamaifondue.com</a>, you
				can also use
				<a href="https://whatcanmyfontdo.com">whatcanmyfontdo.com</a>
				(but not before you say them both out loud)
			</p>
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
	border: 1px dashed white;
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
	top: 1.25vw;
	display: grid;
	place-items: center;
	width: 3rem;
	height: 3rem;
	border: 0;
	outline: 0;
	cursor: pointer;
}

.info svg {
	width: 1.5rem;
	height: 1.5rem;
	fill: var(--red);
}

.ps {
	font-size: 0.8em;
	text-wrap: balance;
	text-align: center;
}
</style>
