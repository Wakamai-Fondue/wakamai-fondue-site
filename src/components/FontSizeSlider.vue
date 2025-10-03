<template>
	<div class="font-size-control">
		<label :for="id">Font size</label>
		<input
			class="font-size-slider"
			type="range"
			:min="min"
			:max="max"
			:step="step"
			:value="modelValue"
			@input="$emit('update:modelValue', Number($event.target.value))"
		/>
		<label class="optical-size-link" v-if="showOpticalSizeLink">
			<input
				type="checkbox"
				:checked="linkOpticalSize"
				@change="$emit('toggleOpticalSize')"
			/>
			Link to optical size
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
		"linkOpticalSize",
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

.optical-size-link {
	font-size: 0.85rem;
}
</style>
