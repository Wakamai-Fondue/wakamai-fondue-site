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
					<button
						type="button"
						class="button off"
						@click="getFontCSSLink()"
					>
						Download stylesheet!
					</button>
				</div>

				<h3>Options</h3>
				<div class="css-options">
					<label>
						<input type="checkbox" v-model="includeUnicodeRange" />
						Unicode-range
					</label>
					<label>
						<input
							type="checkbox"
							v-model="includeFontFeatureFallback"
						/>
						Font-feature-settings fallbacks
					</label>
					<label>
						<input type="checkbox" v-model="includeVariables" />
						Variable instances
					</label>
					<label class="css-namespace">
						<input type="checkbox" v-model="useNamespace" />
						Namespace:
						<input
							type="text"
							v-model="namespace"
							:disabled="!useNamespace"
						/>
					</label>
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
					variables: this.includeVariables,
				},
				namespace: this.useNamespace ? this.namespace : "",
			});
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
	position: sticky;
	display: flex;
	justify-content: center;
	top: calc(var(--nav-height) + 1rem);
	margin-top: 3rem;
	z-index: 1;
}

.css-button-container button {
	padding: 0.5em 1em;
	font-size: 1.5rem;
}

.css-options {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin-bottom: 2rem;
}

.css-options > * {
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
