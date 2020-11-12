<template>
	<div class="modal">
		<button
			type="button"
			aria-label="Info"
			class="info"
			@click="toggleModal"
		></button>
		<div class="modal-content">
			<p class="modal-title">Wakamai Fondue</p>
			<p class="version">Version 1.0</p>
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
				Widdershoven, Dave Crossland and Amelia Bellamy-Royds 💖
			</p>
			<hr />
			<p>
				Made by
				<a href="https://pixelambacht.nl" target="_blank"
					>Roel Nieskens/PixelAmbacht</a
				>
				using
				<a href="https://github.com/devongovett/fontkit" target="_blank"
					>Fontkit</a
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

<script src="./Modal.js"></script>
<style src="./Modal.css" scoped></style>
