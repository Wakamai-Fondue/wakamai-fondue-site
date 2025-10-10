<template>
	<div class="variable-controls">
		<div class="code" v-if="showStyles">
			<CopyToClipboard :content="variableStyles" />
			<Prism language="css" :key="{ variableStyles }">{{
				variableStyles
			}}</Prism>
		</div>
		<label v-if="showOpticalSizeToggle && font.hasOpticalSize">
			<input
				type="checkbox"
				:checked="autoOpticalSizing"
				@change="$emit('updateAutoOpticalSizing', !autoOpticalSizing)"
			/>
			Automatic optical sizing
		</label>
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
				<li v-for="(_, instance) in instances" :key="instance">
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
		<div
			v-if="hasIntances && showInstances === 'dropdown'"
			class="named-instances"
		>
			<h3 v-if="showTitles">Named instances</h3>
			<span class="instances-dropdown-label">
				{{ instanceCount }} Named instances
			</span>
			<select
				@change="selectInstance($event.target.value)"
				:value="activeInstance"
			>
				<option
					v-for="(_, instance) in instances"
					:key="instance"
					:selected="instance === activeInstance"
				>
					{{ instance }}
				</option>
			</select>
			<label class="flip-state">
				<input type="checkbox" v-model="showPreviews" /><span
					>Show previews</span
				>
			</label>
		</div>
		<div
			class="named-instances-preview"
			v-if="showInstancesPreviews && showPreviews"
		>
			<ul class="large-samples">
				<li v-for="(_, instance) in instances" :key="instance">
					{{ instance }}
					<p
						class="large-sample"
						:style="getInstanceStyles(instance)"
					>
						{{ previewText || "\u00A0" }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Prism from "vue-prism-component";
import CopyToClipboard from "@/components/CopyToClipboard.vue";

export default {
	props: [
		"font",
		"showAxes",
		"showInstances",
		"showTitles",
		"showStyles",
		"showInstancesPreviews",
		"showOpticalSizeToggle",
		"autoOpticalSizing",
		"previewText",
	],
	emits: ["updateVariableStyles", "updateAutoOpticalSizing"],
	components: {
		Prism,
		CopyToClipboard,
	},
	data() {
		return {
			activeInstance: "",
			axes: this.font.variable.axes,
			instances: this.font.variable.instances,
			currentStates: {},
			showPreviews: false,
		};
	},
	computed: {
		variableStyles() {
			return this.getVariableStyles();
		},
		hasIntances() {
			return Object.entries(this.instances).length > 0;
		},
		instanceCount() {
			return Object.entries(this.instances).length;
		},
	},
	mounted() {
		if (this.font.hasOpticalSize) {
			this.currentStates["opsz"] = !this.autoOpticalSizing;
		}
		this.updateStyles();
	},
	watch: {
		autoOpticalSizing(enabled) {
			if (this.font.hasOpticalSize) {
				this.currentStates["opsz"] = !enabled;
				this.updateStyles();
			}
		},
	},
	methods: {
		resetAxis(axis) {
			const defaultValue = this.axes.find((o) => o.id === axis).default;
			this.setAxis(axis, defaultValue);
		},
		setAxis(axis, value) {
			this.axes.find((o) => o.id === axis).current = value;
			this.updateStyles();
		},
		selectInstance(instance) {
			this.activeInstance = instance;
			for (const axis in this.instances[instance]) {
				const value = this.instances[instance][axis];
				const targetAxis = this.axes.find((o) => o.id === axis);
				targetAxis.current = value;
			}
			this.updateStyles();
		},
		updateStyles(axis) {
			if (axis === "opsz") {
				this.$emit("unlinkOpticalSize", false);
			}
			this.$emit("updateVariableStyles", this.getVariableStyles());
			this.matchInstance();
		},
		matchInstance() {
			// Using a simple JSON.stringify to compare an object with the
			// current axes values, with the axes values of the instances.
			const currentAxes = {};
			for (const axis of Object.values(this.axes)) {
				currentAxes[axis.id] = axis.current;
			}
			const current = JSON.stringify(currentAxes);

			let activeInstance = "";
			for (const instance in this.instances) {
				if (current === JSON.stringify(this.instances[instance])) {
					activeInstance = instance;
				}
			}
			this.activeInstance = activeInstance;
		},
		getVariableStyles() {
			let styles = "";
			let glue = "";
			let counter = 0;
			let maxProps = 6;
			for (const axis of Object.values(this.axes)) {
				if (this.currentStates[axis.id] !== false) {
					styles += `${glue} "${axis.id}" ${axis.current}`;
					glue = ",";
					// Poor man's code formatting
					if (++counter % maxProps === 0) {
						glue = `,\n                        `;
					}
				}
			}
			if (styles) {
				return `font-variation-settings:${styles};`;
			} else {
				return "";
			}
		},
		getInstanceStyles(instance) {
			const styles = Object.entries(this.instances[instance])
				.map(([axis, value]) => `"${axis}" ${value}`)
				.join(",");
			return `font-variation-settings:${styles};`;
		},
		getBestStep(axis) {
			// Step in units of 1 when range is > 1,
			// Step in units of 0.1 when range is <= 1
			if (
				Math.abs(parseInt(axis.max, 10)) -
					Math.abs(parseInt(axis.min, 10)) <=
				1
			) {
				return "0.1";
			} else {
				return "1";
			}
		},
		flipState(axis, force) {
			const newState = force || this.currentStates[axis] === false;
			this.currentStates[axis] = newState;
			if (axis === "opsz") {
				this.$emit("updateAutoOpticalSizing", !newState);
			}
			this.updateStyles();
		},
	},
};
</script>

<style scoped>
.variable-controls div + div {
	margin-top: 2rem;
}

.axis-slider-container {
	margin-bottom: var(--small-margin);
	display: grid;
	align-items: center;
	grid-template-columns:
		18em
		4em
		1fr
		4em
		4em
		auto;
}

.axis-slider-container label {
	cursor: pointer;
}

.opentype-label {
	margin-left: var(--small-margin);
}

.disabled .axis-min,
.disabled .axis-max,
.disabled .axis-current,
.disabled .axis-name {
	color: var(--unlighterer-grey);
}

.disabled .opentype-label {
	opacity: 0.5;
}

.axis-name {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.axis-min {
	text-align: right;
}

.axis-slider {
	vertical-align: middle;
	padding: 0 0.5rem 0 0.25rem;
}

.axis-slider input {
	width: 100%;
}

.button.hide {
	opacity: 0;
	pointer-events: none;
}

.named-instances > * {
	vertical-align: middle;
}

.named-instances .flip-state {
	margin-left: var(--small-margin);
}

.instances-list ul {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	grid-gap: var(--small-margin);
}

.instance-button {
	padding: 0.25rem 0.5rem;
	border-radius: 0.2rem;
	margin: 0;
	border: 0;
	background: none;
	cursor: pointer;
	width: 100%;
	height: 100%;
	background: var(--yellow);
	color: black;
	transition: background 400ms;
}

.instance-button.active {
	background: var(--green);
	color: white;
	transition: background 0s;
}

.instance-button .container {
	display: flex;
	align-items: center;
	text-align: left;
}

.instances-list .sample {
	flex: none;
	font-family: var(--font-stack);
	font-size: 2.5em;
	margin-right: 0.5rem;
	min-width: 1.5em;
}

.large-samples li + li {
	margin-top: 2rem;
}

.large-sample {
	font-family: var(--font-stack);
	font-size: var(--preview-font-size, 24px);
	background: var(--light-grey);
	margin-top: var(--small-margin);
	padding: 1rem;
}

.instances-dropdown-label {
	margin-right: var(--small-margin);
}

.code {
	position: relative;
}
</style>
