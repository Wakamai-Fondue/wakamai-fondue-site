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
					<h3>Stylesheet options</h3>
					<div class="css-options">
						<label class="css-namespace">
							<input type="checkbox" v-model="useNamespace" />
							Namespace:
							<input
								type="text"
								v-model="namespace"
								:disabled="!useNamespace"
							/>
						</label>

						<label v-if="hasFallbackFeatures">
							<input
								type="checkbox"
								v-model="fontFeatureSettingsOnly"
							/>
							Use font-feature-settings only
						</label>

						<label v-if="hasVariableInstances">
							<input type="checkbox" v-model="includeVariables" />
							Variable instances
						</label>

						<label v-if="hasFallbackFeatures">
							<input
								type="checkbox"
								v-model="includeFontFeatureFallback"
							/>
							Font-feature-settings fallbacks
						</label>

						<label v-if="hasFeatures">
							<input type="checkbox" v-model="includeFeatures" />
							OpenType features
						</label>

						<label v-if="hasDefaultOnFeatures">
							<input
								type="checkbox"
								v-model="includeDefaultOnFeatures"
							/>
							Include on-by-default features
						</label>

						<label>
							<input
								type="checkbox"
								v-model="includeUnicodeRange"
							/>
							Unicode-range
						</label>
					</div>
					<button
						type="button"
						class="button off"
						@click="getFontCSSLink()"
					>
						Download stylesheet!
					</button>
				</div>

				<div class="code">
					<CopyToClipboard :content="css" />
					<Prism language="css" :key="{ css }">{{ css }}</Prism>
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

<script>
import Prism from "vue-prism-component";
import CopyToClipboard from "@/components/CopyToClipboard.vue";

export default {
	props: ["font"],
	components: {
		Prism,
		CopyToClipboard,
	},
	data() {
		return {
			includeUnicodeRange: false,
			includeFontFeatureFallback: false,
			includeVariables: true,
			includeFeatures: true,
			includeDefaultOnFeatures: false,
			fontFeatureSettingsOnly: false,
			useNamespace: false,
			namespace: this.font.slug,
			fontname: this.font.summary["Font name"],
		};
	},
	computed: {
		css() {
			return this.font.stylesheet({
				include: {
					fontFaceUnicodeRange: this.includeUnicodeRange,
					fontFeatureFallback: this.includeFontFeatureFallback,
					fontFeatureSettingsOnly: this.fontFeatureSettingsOnly,
					variables: this.includeVariables,
					features: this.includeFeatures,
					includeDefaultOnFeatures: this.includeDefaultOnFeatures,
				},
				namespace: this.useNamespace ? this.namespace : "",
			});
		},
		hasVariableInstances() {
			return (
				this.font.isVariable &&
				this.font.variable?.instances &&
				Object.keys(this.font.variable.instances).length > 0
			);
		},
		hasFeatures() {
			return this.font.features && this.font.features.length > 0;
		},
		hasDefaultOnFeatures() {
			return this.font.features.some((f) => f.state === "on");
		},
		hasFallbackFeatures() {
			return this.font.features.some(
				(f) => f.state === "off" && f.css?.variant
			);
		},
	},
	methods: {
		getFontCSSLink() {
			const filename = `${this.font.slug}-wakamai-fondue.css`;
			let temp = document.createElement("a");
			temp.setAttribute(
				"href",
				"data:text/plain;charset=utf-8," + encodeURIComponent(this.css)
			);
			temp.setAttribute("download", filename);

			if (document.createEvent) {
				let event = document.createEvent("MouseEvents");
				event.initEvent("click", true, true);
				temp.dispatchEvent(event);
			} else {
				temp.click();
			}
		},
	},
};
</script>

<style scoped>
.css-output {
	position: relative;
}

.css-output p {
	margin-bottom: 1rem;
}

.css-output a {
	color: var(--red);
}

.css-button-container {
	background: white;
	position: sticky;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 0.5rem 1rem;
	top: var(--nav-height);
	margin-top: 2rem;
	margin-bottom: 1rem;
	padding: 0.5rem 0;
	z-index: 1;
}

@media screen and (max-width: 900px) {
	.css-button-container {
		grid-template-columns: 1fr;
	}
}

.css-button-container h3 {
	grid-column: 1 / -1;
	margin: 0;
}

.css-button-container button {
	justify-self: center;
	min-width: 0;
	padding: 0.5em 1em;
	font-size: 1.5rem;
}

.css-options {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem 1rem;
}

.css-options > * {
	min-width: 0;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 0.4em;
}

.css-namespace {
	grid-template-columns: auto auto 1fr;
}

.code {
	position: relative;
}
</style>
