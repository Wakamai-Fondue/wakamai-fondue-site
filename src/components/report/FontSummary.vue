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
			<template v-if="localizations.length > 0">
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

<script>
export default {
	props: ["font", "isExamplefont"],
	data() {
		return {
			summary: this.font.summary,
			features: this.font.features,
		};
	},
	computed: {
		featureLength() {
			return this.font.features.length || "no";
		},
		localizations() {
			return this.font.languageSystems.map((l) => l.name);
		},
		axesCount() {
			if (this.font.variable) {
				return this.font.variable.axes.length;
			} else {
				return "no";
			}
		},
		instancesCount() {
			let count = 0;
			if (this.font.variable) {
				count = Object.keys(this.font.variable.instances).length;
			}
			return count || "no";
		},
	},
};
</script>

<style scoped>
.summary h1 {
	font-family: var(--font-stack);
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 2rem 0;
	margin: 0;
	font-size: 4rem;
}

.oneliner {
	text-align: center;
}

.details {
	margin-top: 2rem;
}

.details tr + tr {
	padding-top: var(--small-margin);
}

.details th {
	padding-top: var(--small-margin);
	padding-right: 1em;
	text-align: left;
	white-space: nowrap;
	text-transform: capitalize;
	vertical-align: top;
}

.details td {
	padding-top: var(--small-margin);
	white-space: pre-line;
}

.features ul {
	display: flex;
	flex-wrap: wrap;
}

.features li {
	margin-top: var(--small-margin);
}

.example-font-shoutout {
	font-size: 1.25rem;
	margin-top: 2rem;
	padding: 2rem;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 20'%3E%3Cpath fill='%23dfd6b3' d='M99.72 2.89c-.1-.86-.25-1.82-.9-2.34-.5-.41-1.18-.45-1.81-.47-4.2-.12-8.95.44-13.16.44C57.56.56 32.52.08 6.28.08 4.4.07 1.28-.29.42.62c-.45.48-.44 1.25-.4 1.92.27 4.33-.13 9.25.14 13.58.04.57.02 1.78.08 2.34.1.89.36 1.46 1.19 1.48 12.39.27 25.42-.32 37.81-.05 6.44.14 14.11-.34 20.86-.25 12.48.17 23.14.3 37.03.3.71 0 1.47-.22 1.93-.8.39-.49.45-1.17.49-1.81.31-5.15.74-9.32.17-14.44z'/%3E%3C/svg%3E");
	background-size: cover;
	text-align: center;
}

.example-font-shoutout a {
	color: inherit;
	color: var(--red);
}
</style>
