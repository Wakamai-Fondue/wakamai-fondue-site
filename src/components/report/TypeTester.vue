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
				<p spellcheck="false" dir="auto" contenteditable v-else>
					Brillat Savarin’s Fondue (an excellent recipe)
					<br />
					<br />
					Ingredients: eggs, cheese, butter, pepper and salt. Take the
					same number of eggs as there are guests; weigh the eggs in
					the shell, allow a third of their weight in Gruyère cheese,
					and a piece of butter one-sixth of the weight of the cheese.
					Break the eggs into a basin, beat them well; add the cheese,
					which should be grated, and the butter, which should be
					broken in small pieces. Stir these ingredients together with
					a wooden spoon; put the mixture into a lined saucepan, place
					it over the fire, and stir until the substance is thick and
					soft. Put in a little salt, according to the age of the
					cheese, and a good sprinkling of pepper, and serve the
					fondue on a very hot silver or metal plate. Do not allow the
					fondue to remain on the fire after the mixture is set, as,
					if it boils, it will be entirely spoilt. 0123456789
					!@#$%^&*(),.?
				</p>
			</div>

			<TextControls
				:font="font"
				:fontSize
				:autoOpticalSizing
				@updateTextStyles="updateTextStyles"
				@updateLanguage="updateLanguage"
				@updateOpticalSize="updateOpticalSize"
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
				:fontSize
				:autoOpticalSizing
				:showAxes="true"
				:showTitles="false"
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

export default {
	props: ["font"],
	components: {
		VariableControls,
		FeatureControls,
		TextControls,
		Prism,
		CopyToClipboard,
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
			fontSize: 24,
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
		updateOpticalSize(size) {
			this.fontSize = size;
		},
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
