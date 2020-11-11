<template>
	<section class="summary content" id="summary">
		<h1>{{ summary["Font name"] }}</h1>
		<p class="oneliner">
			This is

			<template v-if="font.format == 'OpenType/CFF'">an</template>
			<template v-else>a</template>

			<strong> {{ font.format }}</strong>

			<strong v-if="font.isVariable"> variable</strong>
			<strong v-if="font.isColor"> color</strong>

			font with

			<strong>
				{{ charCount }}
				{{ charCount | pluralize("character") }}.
			</strong>

			<template v-if="font.isVariable">
				It has
				<strong>
					{{ axesCount }} {{ axesCount | pluralize("axe") }}
				</strong>
				and
				<strong
					>{{ instancesCount }}
					{{ instancesCount | pluralize("instance") }}.
				</strong>
			</template>

			<template v-if="font.isColor">
				It has
				<strong>
					{{ this.font.colorFormats | listify }} color glyphs.
				</strong>
			</template>

			It has
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
			<strong class="title">Layout features</strong>
			<ul>
				<li v-for="featureData in features" :key="featureData.tag">
					<span class="opentype-label">{{ featureData.tag }}</span>
				</li>
			</ul>
		</div>
		<div class="language">
			<strong class="title">Supported languages</strong>
			<p>
				{{
					font.languageSupport
						| listify("None that Wakamai Fondue could detect")
				}}.
			</p>
			<template v-if="hasLocalization">
				<strong class="title">Localization</strong>
				<p>{{ localizations | listify }}.</p>
			</template>
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

<script src="./Summary.js"></script>
<style src="./Summary.css" scoped></style>
