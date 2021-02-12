<template>
	<section class="stylesheet" id="stylesheet">
		<h2 class="section-title">CSS</h2>
		<div class="content">
			<div v-if="css" class="css-output">
				<p>
					All the CSS needed to unlock the layout features of
					<strong>{{ fontname }}</strong> in one stylesheet!
				</p>
				<p>
					Wakamai Fondue uses CSS variables to work around the
					<a
						href="http://pixelambacht.nl/2019/fixing-variable-font-inheritance/"
						target="_blank"
						>inheritance problem of font-feature-settings</a
					>. This means applied layout feature will cascade
					predictably, and you can simply combine classes to use
					multiple layout features together.
				</p>
				<div class="css-button-container">
					<button @click="getFontCSSLink()" class="button">
						Download stylesheet!
					</button>
				</div>
				<div class="code">
					<CopyToClipboard :content="styles" />
					<Prism language="css">{{ css }}</Prism>
				</div>
			</div>
			<div v-else>
				<strong>There is no CSS needed for this font!</strong> You can
				use it without any special CSS — if there are any layout
				features in the font, they’ll be turned on automatically by the
				browser.
			</div>
		</div>
	</section>
</template>

<script src="./Stylesheet.js"></script>
<style src="./Stylesheet.css" scoped></style>
