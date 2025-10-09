<template>
	<div class="preview-font-size-control">
		<label>Font size</label>
		<input
			type="range"
			min="4"
			max="120"
			step="1"
			:value="fontSize"
			@input="updateFontSize"
		/>
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
	z-index: 1;
	display: flex;
	align-items: center;
	gap: var(--small-margin);
}
</style>
