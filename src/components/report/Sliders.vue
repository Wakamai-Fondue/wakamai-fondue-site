<template>
	<ul class="axes-sliders">
		<li class="axis-slider" v-for="(axis, tag) in axes" :key="tag">
			<span class="opentype-label">{{ tag }}</span>
			<span>{{ axis.name }}</span>
			<span class="min">{{ axis.min }}</span>
			<input
				type="range"
				:name="tag"
				:min="axis.min"
				:max="axis.max"
				v-model="axis.current"
				@input="updateAxes()"
			/>
			<span>{{ axis.max }}</span>
			<strong>{{ axis.current }}</strong>
			<button
				type="button"
				:class="axis.current !== axis.default ? 'show' : 'hide'"
				@click="resetAxis(tag)"
			>
				Reset
			</button>
		</li>
	</ul>
</template>

<script src="./Sliders.js"></script>
<style src="./Sliders.css" scoped></style>
