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
				<strong>{{ axesCount }}</strong>
				{{ axesCount | pluralize("axe") }}
				and
				<strong>{{ instancesCount }}</strong>
				{{ instancesCount | pluralize("instance") }}.
			</template>

			<template v-if="font.isColor">
				It has
				<strong>{{ this.font.colorFormats | listify }}</strong>
				color glyphs.
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
					<td>{{ value }}</td>
				</tr>
			</tbody>
		</table>
		<div
			class="features"
			aria-label="Font layout features"
			v-if="font.hasFeatures"
		>
			<strong>Layout features</strong>
			<ul>
				<li
					v-for="(featureData, feature) in features.fixed"
					:key="feature"
				>
					<span class="opentype-label">{{ feature }}</span>
				</li>
				<li
					v-for="(featureData, feature) in features.optional"
					:key="feature"
				>
					<span class="opentype-label">{{ feature }}</span>
				</li>
			</ul>
			<p v-if="features.length == 0">None.</p>
		</div>
	</section>
</template>

<script src="./Summary.js"></script>
<style src="./Summary.css" scoped></style>
