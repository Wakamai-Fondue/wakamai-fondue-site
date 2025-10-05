<template>
	<div class="font-size-control">
		<label>Font size</label>
		<input
			class="font-size-slider"
			type="range"
			:min="min || 4"
			:max="max || 120"
			:step="step || 1"
			:value="modelValue"
			@input="$emit('update:modelValue', Number($event.target.value))"
		/>
		<label class="optical-size-link" v-if="showOpticalSizeLink">
			<input
				type="checkbox"
				:checked="autoOpticalSizing"
				@change="$emit('toggleOpticalSize')"
			/>
			Automatic optical sizing
		</label>
	</div>
</template>

<script>
export default {
	props: [
		"modelValue",
		"min",
		"max",
		"step",
		"showOpticalSizeLink",
		"autoOpticalSizing",
	],
	emits: ["update:modelValue", "toggleOpticalSize"],
};
</script>

<style scoped>
.font-size-control {
	display: flex;
	align-items: center;
	gap: var(--small-margin);
}

.font-size-slider {
	flex: auto;
	max-width: 20rem;
}
</style>
