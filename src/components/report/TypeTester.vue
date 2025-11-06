<template>
	<section id="tester">
		<h2 class="section-title">Tester</h2>
		<div class="content tester-container">
			<div
				class="tester"
				:class="{ sticky }"
				:style="
					$filters.inlinestyle(
						`${variableStyles}${featureStyles}${textStyles}` +
							(autoOpticalSizing
								? ''
								: 'font-optical-sizing: none;')
					)
				"
				:lang="language"
			>
				<button
					contenteditable="false"
					type="button"
					alt="Pin text"
					class="sticky-button"
					:class="{ sticky }"
					@click="sticky = !sticky"
				>
					📌
				</button>
				<p
					dir="auto"
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					v-if="customText"
				>
					{{ customText }}
				</p>
				<p
					dir="auto"
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					v-else
				>
					{{ previewText }}
				</p>
			</div>

			<TextControls
				:font="font"
				:autoOpticalSizing
				:fontSize="fontSize"
				@updateTextStyles="updateTextStyles"
				@updateLanguage="updateLanguage"
				@updateAutoOpticalSizing="updateAutoOpticalSizing"
			/>
			<FeatureControls
				:font="font"
				:showTitles="false"
				@updateFeatureStyles="updateFeatureStyles"
			/>
			<VariableControls
				v-if="font.isVariable"
				:font="font"
				:autoOpticalSizing
				:showAxes="false"
				:showTitles="false"
				:showInstancesPreviews="false"
				showInstances="dropdown"
				@updateVariableStyles="updateVariableStyles"
				@updateAutoOpticalSizing="updateAutoOpticalSizing"
			/>
			<div class="code">
				<Prism language="html" v-if="hasLocalization" :key="{ html }">{{
					html
				}}</Prism>
				<div class="code-styles">
					<CopyToClipboard :content="styles" />
					<Prism language="css" :key="{ styles }">{{ styles }}</Prism>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import VariableControls from "./VariableControls.vue";
import FeatureControls from "./FeatureControls.vue";
import TextControls from "./TextControls.vue";
import CopyToClipboard from "@/components/CopyToClipboard.vue";
import Prism from "vue-prism-component";
import { usePreferences } from "@/composables/usePreferences.js";

export default {
	props: ["font"],
	components: {
		VariableControls,
		FeatureControls,
		TextControls,
		Prism,
		CopyToClipboard,
	},
	setup() {
		const { previewText, fontSize } = usePreferences();
		return {
			previewText,
			fontSize,
		};
	},
	data() {
		return {
			customText: this.font.customText,
			variableStyles: "",
			featureStyles: "",
			textStyles: "",
			language: null,
			sticky: false,
			autoOpticalSizing: true,
		};
	},
	computed: {
		html() {
			return this.getHTML();
		},
		styles() {
			return this.getStyles();
		},
	},
	methods: {
		updateAutoOpticalSizing(enabled) {
			this.autoOpticalSizing = enabled;
		},
		updateVariableStyles(updatedStyles) {
			this.variableStyles = updatedStyles;
		},
		updateFeatureStyles(updatedStyles) {
			this.featureStyles = updatedStyles;
		},
		updateTextStyles(updatedStyles) {
			this.textStyles = updatedStyles;
		},
		updateLanguage(updatedLanguage) {
			updatedLanguage = updatedLanguage || null;
			this.language = updatedLanguage;
		},
		getHTML() {
			if (this.language) {
				return `<div lang="${this.language}"> ... </div>`;
			} else {
				return `<div> ... </div>`;
			}
		},
		getStyles() {
			let css = this.textStyles;
			if (this.featureStyles) {
				css += `\n\n` + this.featureStyles;
			}
			if (this.variableStyles) {
				css += `\n\n` + this.variableStyles;
			}
			return css;
		},
		hasLocalization() {
			return this.font.languageSystems.length > 0;
		},
	},
};
</script>

<style scoped>
.tester-container {
	position: relative;
}

.tester {
	position: relative;
	font-family: var(--font-stack);
	max-width: var(--max-content-width);
	margin: 0 auto 0 auto;
	background: var(--light-grey);
	color: black;
}

.tester p {
	padding: 1rem;
}

.tester.sticky {
	position: sticky;
	top: 0;
}

.code {
	margin-top: 2rem;
}

.code-styles {
	position: relative;
}

.sticky-button {
	padding: var(--small-margin);
	font-family: sans-serif;
	border: 0;
	background: none;
	position: absolute;
	top: 0;
	right: 0;
	opacity: 0.5;
	font-size: 1.5rem;
}

.sticky-button.sticky {
	opacity: 1;
}
</style>
