<template>
	<section class="variable" id="variable">
		<h2 class="section-title">Variable</h2>
		<div class="content variable-tester-container">
			<div class="variable-tester" :class="{ sticky }">
				<p
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					:style="$filters.inlinestyle(variableStyles)"
					@input="updatePreviewText"
				>
					{{ previewText }}
				</p>
				<button
					contenteditable="false"
					spellcheck="false"
					autocorrect="off"
					type="button"
					alt="Pin text"
					class="sticky-button"
					:class="{ sticky }"
					@click="sticky = !sticky"
				>
					📌
				</button>
			</div>
			<VariableControls
				:font="font"
				:showAxes="true"
				:showTitles="true"
				:showStyles="true"
				showInstances="dropdown"
				showInstancesPreviews="true"
				:previewText="previewText"
				@updateVariableStyles="updateVariableStyles"
			/>
		</div>
	</section>
</template>

<script>
import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls,
	},
	data() {
		return {
			variableStyles: "",
			sticky: false,
			previewText:
				'The melting cheese & bread explode in a quick wave of joy: "1, 2, 3… zen!"',
		};
	},
	methods: {
		updateVariableStyles(updatedStyles) {
			this.variableStyles = updatedStyles;
		},
		updatePreviewText(event) {
			this.previewText = event.target.textContent;
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
	padding: 1rem;
	font-size: 3rem;
	background: var(--light-grey);
	margin-bottom: 2rem;
}

.variable-tester.sticky {
	position: sticky;
	top: 0;
	z-index: 1;
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
