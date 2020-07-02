<template>
	<div class="variable-sliders">
		<div v-if="showAxes" class="axes">
			<h3 v-if="showTitles">Variable axes</h3>
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
						class="button"
						:class="axis.current !== axis.default ? 'show' : 'hide'"
						@click="resetAxis(tag)"
					>
						Reset
					</button>
				</li>
			</ul>
		</div>
		<div v-if="showInstances" class="instances">
			<h3 v-if="showTitles">Named instances</h3>
			<ul>
				<li>
					<button
						type="button"
						class="button"
						:class="instance == activeInstance ? 'active' : ''"
						@click="selectInstance(instance, $event)"
						v-for="(values, instance) in instances"
						:key="instance"
					>
						{{ instance }}
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./Sliders.js"></script>
<style src="./Sliders.css" scoped></style>
