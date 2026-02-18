<template>
	<section class="variable" id="variable">
		<h2 class="section-title">Variable</h2>
		<div class="content variable-tester-container">
			<div class="variable-tester">
				<p
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					:style="
						$filters.inlinestyle(variableStyles) +
						(autoOpticalSizing ? '' : ' font-optical-sizing: none;')
					"
					@input="updatePreviewText"
				>
					{{ previewText }}
				</p>
			</div>
			<VariableControls
				:font="font"
				:showAxes="true"
				:showTitles="true"
				:showStyles="true"
				:showOpticalSizeToggle="true"
				showInstances="dropdown"
				showInstancesPreviews="true"
				:previewText="previewText"
				:autoOpticalSizing="autoOpticalSizing"
				@updateVariableStyles="updateVariableStyles"
				@updateAutoOpticalSizing="updateAutoOpticalSizing"
			/>
		</div>
	</section>
</template>

<script>
import VariableControls from "./VariableControls.vue";
import { usePreferences } from "@/composables/usePreferences.js";

export default {
	props: ["font"],
	components: {
		VariableControls,
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
			autoOpticalSizing: true,
		};
	},
	methods: {
		updateVariableStyles(updatedStyles) {
			this.variableStyles = updatedStyles;
		},
		updatePreviewText(event) {
			this.previewText = event.target.textContent;
		},
		updateAutoOpticalSizing(newValue) {
			this.autoOpticalSizing = newValue;
		},
	},
};
</script>

<style scoped>
.variable-tester-container {
	position: relative;
}

.variable-tester {
	position: relative;
	font-family: var(--font-stack);
	font-size: calc(var(--font-multiplier) * var(--preview-font-size, 2rem));
	padding: 1rem;
	background: var(--light-grey);
	color: black;
}
</style>
