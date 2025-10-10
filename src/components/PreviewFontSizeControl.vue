<template>
	<div class="preview-font-size-control">
		<label for="preview-font-size-slider">Font size</label>
		<input
			id="preview-font-size-slider"
			type="range"
			min="4"
			max="120"
			step="1"
			:value="fontSize"
			@input="updateFontSize"
		/>
		<!-- <span class="font-size-value" aria-live="polite">{{ fontSize }}px</span> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			fontSize: 24,
		};
	},
	mounted() {
		this.setCSSVariable();
	},
	methods: {
		updateFontSize(event) {
			this.fontSize = Number(event.target.value);
			this.setCSSVariable();
		},
		setCSSVariable() {
			document.body.style.setProperty(
				"--preview-font-size",
				`${this.fontSize}px`
			);
		},
	},
};
</script>

<style scoped>
.preview-font-size-control {
	display: flex;
	align-items: center;
	gap: var(--small-margin);
}

.preview-font-size-control input {
	width: min(15vw, 200px);
}

.font-size-value {
	min-width: 5ch;
	text-align: right;
}
</style>
