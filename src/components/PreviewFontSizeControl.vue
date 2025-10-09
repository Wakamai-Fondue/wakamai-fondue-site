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
			aria-label="Preview font size"
			@input="updateFontSize"
		/>
		<span class="font-size-value" aria-live="polite">{{ fontSize }}px</span>
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
	position: fixed;
	right: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	gap: var(--small-margin);
	background: var(--yellow);
	padding: 1em;
}

.preview-font-size-control input {
	width: min(15vw, 200px);
}

.font-size-value {
	min-width: 5ch;
	text-align: right;
}
</style>
