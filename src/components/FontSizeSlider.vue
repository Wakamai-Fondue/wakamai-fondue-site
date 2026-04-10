<template>
	<div class="font-size-slider" :class="{ visible }">
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
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
	},
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
	padding: 0.75em 0 0.75em 1em;
	height: 100%;
	accent-color: var(--green);
	opacity: 0;
	transition: opacity 0.2s ease;
}

.font-size-slider.visible {
	opacity: 1;
}

.font-size-slider input {
	width: 180px;
}

.font-size-value {
	min-width: 5ch;
	text-align: right;
}
</style>
