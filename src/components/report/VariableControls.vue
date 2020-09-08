<template>
	<div class="variable-sliders">
		<div v-if="showAxes" class="axes">
			<h3 v-if="showTitles">Variable axes</h3>
			<ul class="axes-sliders">
				<li class="axis-slider" v-for="(axis, tag) in axes" :key="tag">
					<span>
						<span class="opentype-label">{{ axis.id }}</span>
						<span class="axis-name">{{ axis.name }}</span>
					</span>
					<span class="axis-min">{{ axis.min }}</span>
					<input
						type="range"
						:name="axis.id"
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
		<div v-if="hasIntances && showInstances === 'list'" class="instances-list">
			<h3 v-if="showTitles">Named instances</h3>
			<ul>
				<li v-for="(axes, instance) in instances" :key="instance">
					<button
						type="button"
						class="button instance-button"
						:class="{ active: instance == activeInstance }"
						@click="selectInstance(instance)"
					>
						<span class="container">
							<span
								class="sample"
								:style="getInstanceStyles(instance)"
								>wf</span
							>
							{{ instance }}
						</span>
					</button>
				</li>
			</ul>
		</div>
		<div v-if="hasIntances && showInstances === 'dropdown'">
			<h3 v-if="showTitles">Named instances</h3>
			<span class="instances-dropdown-label">
				Named instances:
			</span>
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
		<div v-if="showStyles" class="variable-styles">
			<code>
				{{ variableStyles }}
			</code>
		</div>
	</div>
</template>

<script src="./VariableControls.js"></script>
<style src="./VariableControls.css" scoped></style>
