<template>
	<section id="tester">
		<h2 class="section-title">Tester</h2>
		<div class="content tester-container">
			<div class="tester">
				<p
					ref="testerText"
					dir="auto"
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					:style="
						$filters.inlinestyle(
							`${variableStyles}${featureStyles}${textStyles}`
						)
					"
					:lang="language"
				></p>
			</div>

			<TextControls
				:font="font"
				@updateTextStyles="updateTextStyles"
				@updateLanguage="updateLanguage"
				@selectInstance="selectInstance"
			/>
			<FeatureControls
				:font="font"
				:showTitles="false"
				@updateFeatureStyles="updateFeatureStyles"
			/>
			<VariableControls
				v-if="font.isVariable"
				:font="font"
				:showAxes="false"
				:showTitles="false"
				:showInstancesPreviews="false"
				:showInstancesInline="false"
				showInstances="dropdown"
				:selectedInstance="selectedInstance"
				@updateVariableStyles="updateVariableStyles"
			/>
		</div>
	</section>
</template>

<script>
import VariableControls from "./VariableControls.vue";
import FeatureControls from "./FeatureControls.vue";
import TextControls from "./TextControls.vue";
import { usePreferences } from "@/composables/usePreferences.js";

export default {
	props: ["font"],
	components: {
		VariableControls,
		FeatureControls,
		TextControls,
	},
	setup() {
		const { previewText } = usePreferences();
		return {
			previewText,
		};
	},
	data() {
		return {
			variableStyles: "",
			featureStyles: "",
			textStyles: "",
			language: null,
			selectedInstance: "",
		};
	},
	mounted() {
		this.$refs.testerText.textContent = this.previewText;
	},
	methods: {
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
		selectInstance(instance) {
			this.selectedInstance = instance;
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
	font-size: calc(var(--font-multiplier) * var(--preview-font-size, 2rem));
	padding: 1rem;
	background: var(--light-grey);
	color: black;
}
</style>
