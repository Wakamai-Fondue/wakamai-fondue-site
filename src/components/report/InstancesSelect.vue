<template>
	<div v-if="showLabel" class="instances-select">
		<span>Instance</span>
		<select
			name="Instances"
			:value="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
		>
			<option
				v-for="(_, instance) in font.variable.instances"
				:key="instance"
				:value="instance"
			>
				{{ instance }}
			</option>
		</select>
	</div>
	<select
		v-else
		name="Instances"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
	>
		<option
			v-for="(_, instance) in font.variable.instances"
			:key="instance"
			:value="instance"
		>
			{{ instance }}
		</option>
	</select>
</template>

<script>
export default {
	props: {
		font: {
			type: Object,
			required: true,
		},
		modelValue: {
			type: String,
			default: "",
		},
		showLabel: {
			type: Boolean,
			default: true,
		},
	},
	emits: ["update:modelValue"],
};
</script>
