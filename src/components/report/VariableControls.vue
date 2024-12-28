<template>
	<div class="variable-sliders">
		<div v-if="showAxes" class="axes">
			<h3 v-if="showTitles">Variable axes</h3>
			<ul class="axes-sliders">
				<li
					class="axis-slider-container"
					:class="currentStates[axis.id] === false ? 'disabled' : ''"
					v-for="(axis, tag) in axes"
					:key="tag"
				>
					<span>
						<button
							v-if="currentStates[axis.id] !== false"
							type="button"
							class="button on"
							@click="flipState(axis.id)"
						>
							On
						</button>
						<button
							v-if="currentStates[axis.id] === false"
							type="button"
							class="button off"
							@click="flipState(axis.id)"
						>
							Off
						</button>
						<span class="opentype-label">{{ axis.id }}</span>
						<span class="axis-name">{{ axis.name }}</span>
					</span>
					<span class="axis-min">{{ axis.min }}</span>
					<span
						class="axis-slider"
						@mousedown="flipState(axis.id, true)"
					>
						<input
							type="range"
							:name="axis.id"
							:step="getBestStep(axis)"
							:min="axis.min"
							:max="axis.max"
							:disabled="currentStates[axis.id] === false"
							v-model.number="axis.current"
							@input="updateStyles(axis.id)"
						/>
					</span>
					<span class="axis-max">{{ axis.max }}</span>
					<strong class="axis-current">{{ axis.current }}</strong>
					<button
						type="button"
						class="button active"
						:class="axis.current !== axis.default ? 'show' : 'hide'"
						:tabindex="axis.current !== axis.default ? 0 : -1"
						:disabled="currentStates[axis.id] === false"
						@click="resetAxis(axis.id)"
					>
						Reset
					</button>
				</li>
			</ul>
		</div>
		<div
			v-if="hasIntances && showInstances === 'list'"
			class="instances-list"
		>
			<h3 v-if="showTitles">Named instances</h3>
			<ul>
				<li v-for="(axes, instance) in instances" :key="instance">
					<button
						type="button"
						class="instance-button"
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
				{{ instanceCount }} Named instances
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
		<div class="code" v-if="showStyles">
			<CopyToClipboard :content="variableStyles" />
			<Prism language="css" :key="{ variableStyles }">{{
				variableStyles
			}}</Prism>
		</div>
	</div>
</template>

<script src="./VariableControls.js"></script>
<style src="./VariableControls.css" scoped></style>
