<template>
	<section class="color" id="color">
		<h2 class="section-title">Color</h2>
		<div class="content">
			<p>
				This font has
				<strong>{{ this.font.colorFormats | listify }}</strong>
				color glyphs.

				<template v-if="palettes.length">
					It has {{ palettes.length }}
					{{ palettes | pluralize("palette") }}.
				</template>
				<template v-else>
					The colors are hardcoded in the font.
				</template>
			</p>
			<h3 v-if="true">Palettes</h3>
			<ul class="palette">
				<li
					v-for="color in palettes"
					:key="color"
					:style="{ background: color }"
				>
					<span class="label">{{ color }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script src="./Color.js"></script>
<style src="./Color.css" scoped></style>
