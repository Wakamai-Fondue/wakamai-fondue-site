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

		<dl class="details">
			<template v-for="(value, key) in summary" :key="key">
				<dt>{{ key }}</dt>
				<dd>{{ value }}</dd>
			</template>
		</dl>

		<div
			class="features"
			aria-label="Font layout features"
			v-if="font.hasFeatures"
		>
			<h3>Layout features</h3>
			<ul>
				<li v-for="featureData in features" :key="featureData.tag">
					<a
						v-if="featureData.state !== 'fixed'"
						:href="`#feature-${featureData.tag}`"
						class="opentype-label"
						>{{ featureData.tag }}</a
					>
					<span v-else class="opentype-label">{{
						featureData.tag
					}}</span>
				</li>
			</ul>
		</div>

		<div v-if="localizations.length > 0">
			<h3>
				{{ $filters.pluralize(localizations.length, "Localization") }}
			</h3>
			<p>{{ $filters.listify(localizations) }}.</p>
		</div>

		<ExampleFontShoutout v-if="isExamplefont" />
	</section>
</template>

<script>
import ExampleFontShoutout from "./ExampleFontShoutout.vue";

export default {
	components: {
		ExampleFontShoutout,
	},
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
	margin: 4rem 0 0 0;
	font-size: 4rem;
}

.oneliner {
	text-align: center;
}

.details {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: var(--small-margin);
}

.details dt {
	font-weight: bold;
}

.features ul {
	display: flex;
	flex-wrap: wrap;
}

.features li {
	margin-top: var(--small-margin);
}

.features a {
	text-decoration: none;
}
</style>
