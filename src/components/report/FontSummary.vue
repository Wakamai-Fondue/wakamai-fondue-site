<template>
	<section class="summary content" id="summary">
		<h1>{{ summary["Font name"] }}</h1>
		<p class="oneliner">
			This is a

			<strong v-if="font.isHinted"> hinted</strong>

			<strong v-if="font.isVariable"> variable</strong>
			<strong v-if="font.isColor"> color</strong>

			font with

			<strong v-if="!font.outlines.length"> no</strong>
			<strong v-else> {{ font.outlines.join(", ") }}</strong>

			outlines<template v-if="!font.isColor">.</template>

			<template v-if="font.isColor">
				and
				<strong>
					{{ this.font.colorFormats | listify }} color glyphs.
				</strong>
			</template>

			<br />

			It has

			<strong>
				{{ font.charCount }}
				{{ font.charCount | pluralize("character") }}
			</strong>

			and

			<strong>
				{{ font.glyphCount }}
				{{ font.glyphCount | pluralize("glyph") }},
			</strong>

			<template v-if="font.isVariable">
				<strong>
					{{ axesCount }} {{ axesCount | pluralize("axe") }}
				</strong>
				and
				<strong
					>{{ instancesCount }}
					{{ instancesCount | pluralize("instance") }},
				</strong>
			</template>

			and

			<strong>
				{{ featureLength }}
				{{ featureLength | pluralize("layout feature") }}.
			</strong>
		</p>

		<table class="details">
			<tbody>
				<tr v-for="(value, key) in summary" :key="key">
					<th scope="row">{{ key }}</th>
					<td
						v-html="value"
						v-linkified:options="{ className: '' }"
					/>
				</tr>
			</tbody>
		</table>

		<div
			class="features"
			aria-label="Font layout features"
			v-if="font.hasFeatures"
		>
			<h3>Layout features</h3>
			<ul>
				<li v-for="featureData in features" :key="featureData.tag">
					<span class="opentype-label">{{ featureData.tag }}</span>
				</li>
			</ul>
		</div>

		<div>
			<h3>Supported languages</h3>
			<p>
				{{
					font.languageSupport
						| listify("None that Wakamai Fondue could detect")
				}}.
			</p>
			<template v-if="hasLocalization">
				<h3>Localization</h3>
				<p>{{ localizations | listify }}.</p>
			</template>
		</div>

		<div>
			<h3>Unicode support</h3>
			<p>{{ font.unicodeRange.join(", ") }}.</p>
		</div>

		<div v-if="isExamplefont" class="example-font-shoutout">
			<a href="https://djr.com/gimlet/" target="_blank">
				<strong>Gimlet</strong>
			</a>
			by
			<a href="https://djr.com/" target="_blank">David Jonathan Ross</a>
			is today’s Wakamai Fondue demo font.
			<a href="https://djr.com/gimlet/#buy" target="_blank"
				>Get it here!</a
			>
		</div>
	</section>
</template>

<script src="./FontSummary.js"></script>
<style src="./FontSummary.css" scoped></style>
