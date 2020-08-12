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
						v-model.number="axis.current"
						@input="updateStyles()"
					/>
					<span>{{ axis.max }}</span>
					<strong>{{ axis.current }}</strong>
					<button
						type="button"
						class="button"
						:class="axis.current !== axis.default ? 'show' : 'hide'"
						:tabindex="axis.current !== axis.default ? 0 : -1"
						@click="resetAxis(tag)"
					>
						Reset
					</button>
				</li>
			</ul>
		</div>
		<div v-if="showInstances === 'list'" class="instances-list">
			<h3 v-if="showTitles">Named instances</h3>
			<ul>
				<li>
					<button
						type="button"
						class="button"
						:class="instance == activeInstance ? 'active' : ''"
						@click="selectInstance(instance)"
						v-for="(axes, instance) in instances"
						:key="instance"
					>
						<span>
							<span class="sample" :style="axesStyles(axes)"
								>wf</span
							>
							{{ instance }}
						</span>
					</button>
				</li>
			</ul>
		</div>
		<div v-if="showInstances === 'dropdown'" class="instances-dropdown">
			<h3 v-if="showTitles">Named instances</h3>
			<select
				@change="selectInstance($event.target.value)"
				:value="activeInstance"
			>
				<option
					v-for="(axes, instance) in instances"
					:key="instance"
					:selected="instance === activeInstance"
				>
					{{ instance }}
				</option>
			</select>
		</div>
	</div>
</template>

<script src="./VariableControls.js"></script>
<style src="./VariableControls.css" scoped></style>
