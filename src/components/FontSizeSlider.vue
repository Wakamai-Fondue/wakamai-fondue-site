<template>
	<div class="font-size-slider">
		<label for="font-size-slider">Font size</label>
		<input
			id="font-size-slider"
			type="range"
			min="4"
			max="180"
			step="1"
			:value="fontSize"
			@input="updateFontSize"
		/>
		<!-- <span class="font-size-value" aria-live="polite">{{ fontSize }}px</span> -->
	</div>
</template>

<script>
import { usePreferences } from "@/composables/usePreferences.js";

export default {
	setup() {
		const { fontSize, setFontSize } = usePreferences();
		return {
			fontSize,
			setFontSize,
		};
	},
	mounted() {
		this.setFontSize(this.fontSize);
	},
	methods: {
		updateFontSize(event) {
			this.setFontSize(Number(event.target.value));
		},
	},
};
</script>

<style scoped>
.font-size-slider {
	display: flex;
	align-items: center;
	gap: var(--small-margin);
	font-size: 1rem;
	background: var(--offwhite);
	padding: 0.75em 1em;
	border-radius: 0.4em;
}

.font-size-slider input {
	width: 180px;
}

.font-size-value {
	min-width: 5ch;
	text-align: right;
}
</style>
