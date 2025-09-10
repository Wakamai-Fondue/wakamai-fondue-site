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
					{{ $filters.listify(this.font.colorFormats) }} color glyphs.
				</strong>
			</template>

			<br />

			It has

			<strong>
				{{ font.charCount }}
				{{ $filters.pluralize(font.charCount, "character") }}
			</strong>

			and

			<strong>
				{{ font.glyphCount }}
				{{ $filters.pluralize(font.glyphCount, "glyph") }},
			</strong>

			<template v-if="font.isVariable">
				<strong>
					{{ axesCount }} {{ axesCount === 1 ? "axis" : "axes" }}
				</strong>
				and
				<strong
					>{{ instancesCount }}
					{{ $filters.pluralize(instancesCount, "instance") }},
				</strong>
			</template>

			and

			<strong>
				{{ featureLength }}
				{{ $filters.pluralize(featureLength, "layout feature") }}.
			</strong>
		</p>

		<table class="details">
			<tbody>
				<tr v-for="(value, key) in summary" :key="key">
					<th scope="row">{{ key }}</th>
					<td v-html="value" />
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
					$filters.listify(
						font.languageSupport,
						"None that Wakamai Fondue could detect"
					)
				}}.
			</p>
			<template v-if="hasLocalization">
				<h3>Localization</h3>
				<p>{{ $filters.listify(localizations) }}.</p>
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
