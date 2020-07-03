<template>
	<section class="color" id="color">
		<h2 class="section-title">Color</h2>
		<div class="content">
			<p>
				This font has <strong>{{ colorFormat }}</strong> color glyphs.
				<template v-if="palettes">
					It has {{ palettes }} {{ palettes | pluralize("palette") }}
				</template>
				<template else>
					The colors are hardcoded in the font.
				</template>
			</p>
			<h3>Palettes</h3>
			<ul v-for="palette in palettes" :key="palette">
				<li v-for="color in palette" :key="color">{{ color }}</li>
			</ul>
		</div>
	</section>
</template>

<script src="./Color.js"></script>
<style src="./Color.css" scoped></style>
