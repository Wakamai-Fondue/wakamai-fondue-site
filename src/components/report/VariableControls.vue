<template>
	<div class="variable-controls">
		<div class="code" v-if="showStyles">
			<CopyToClipboard :content="variableStyles" />
			<Prism language="css" :key="{ variableStyles }">{{
				variableStyles
			}}</Prism>
		</div>
		<div v-if="showAxes" class="axes">
			<h3 v-if="showTitles">Variable axes</h3>
			<label
				v-if="showOpticalSizeToggle && font.hasOpticalSize"
				class="auto-opsz"
			>
				<input
					type="checkbox"
					:checked="autoOpticalSizing"
					@change="
						$emit('updateAutoOpticalSizing', !autoOpticalSizing)
					"
				/>
				Automatic optical sizing
			</label>
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
							@input="handleSliderChange(axis)"
						/>
					</span>
					<span class="axis-max">{{ axis.max }}</span>
					<input
						type="text"
						name="current-axis-value"
						class="axis-current"
						pattern="[0-9.\-]*"
						v-model="axisInputValues[axis.id]"
						:disabled="currentStates[axis.id] === false"
						@input="handleInputChange(axis)"
						@focus="selectInputText"
						@keydown.enter="commitInputValue($event, axis)"
						@keydown.escape="$event.target.blur()"
					/>
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
			v-if="
				hasIntances &&
				showInstances === 'dropdown' &&
				showInstancesInline !== false
			"
			class="named-instances"
		>
			<h3 v-if="showTitles">Named instances</h3>
			<div>
				<span
					class="instances-dropdown-label"
					v-if="showInstancesLabel !== false"
				>
					{{ instanceCount }} Named instances
				</span>
				<select
					name="Named instances"
					@change="selectInstance($event.target.value)"
					:value="activeInstance"
				>
					<option
						v-for="(_, instance) in instances"
						:key="instance"
						:value="instance"
						:selected="instance === activeInstance"
					>
						{{ instance }}
					</option>
				</select>
				<label class="flip-state" v-if="showInstancesPreviews">
					<input type="checkbox" v-model="showPreviews" /><span>
						Show previews
					</span>
				</label>
			</div>
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
		"showInstancesInline",
		"showInstancesLabel",
		"selectedInstance",
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
			axisInputValues: {},
			inputTimeouts: {},
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
		for (const axis of Object.values(this.axes)) {
			this.axisInputValues[axis.id] = axis.current;
		}
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
		selectedInstance(instance) {
			if (instance) {
				this.selectInstance(instance);
			}
		},
	},
	methods: {
		handleSliderChange(axis) {
			this.axisInputValues[axis.id] = axis.current;
			this.updateStyles(axis.id);
		},
		handleInputChange(axis) {
			if (this.inputTimeouts[axis.id]) {
				clearTimeout(this.inputTimeouts[axis.id]);
			}
			this.inputTimeouts[axis.id] = setTimeout(() => {
				this.applyInputValue(axis);
			}, 500);
		},
		selectInputText(event) {
			event.target.select();
		},
		applyInputValue(axis) {
			const numValue = parseFloat(this.axisInputValues[axis.id]);
			if (!isNaN(numValue)) {
				axis.current = Math.max(axis.min, Math.min(axis.max, numValue));
				this.axisInputValues[axis.id] = axis.current;
				this.updateStyles(axis.id);
			}
		},
		commitInputValue(event, axis) {
			if (this.inputTimeouts[axis.id]) {
				clearTimeout(this.inputTimeouts[axis.id]);
			}
			this.applyInputValue(axis);
			event.target.blur();
		},
		resetAxis(axis) {
			const defaultValue = this.axes.find((o) => o.id === axis).default;
			this.setAxis(axis, defaultValue);
		},
		setAxis(axis, value) {
			this.axes.find((o) => o.id === axis).current = value;
			this.axisInputValues[axis] = value;
			this.updateStyles();
		},
		selectInstance(instance) {
			this.activeInstance = instance;
			for (const axis in this.instances[instance]) {
				const value = this.instances[instance][axis];
				const targetAxis = this.axes.find((o) => o.id === axis);
				targetAxis.current = value;
				this.axisInputValues[axis] = value;
			}
			// If instance sets opsz, disable automatic optical sizing
			if ("opsz" in this.instances[instance]) {
				this.$emit("updateAutoOpticalSizing", false);
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
			// Compare current axes values with named instances
			const currentAxes = {};
			for (const axis of Object.values(this.axes)) {
				currentAxes[axis.id] = axis.current;
			}

			let activeInstance = "";
			for (const instance in this.instances) {
				const instanceAxes = this.instances[instance];
				let matches = true;

				// Check if all axis values match
				for (const axisId in currentAxes) {
					if (currentAxes[axisId] !== instanceAxes[axisId]) {
						matches = false;
						break;
					}
				}

				if (matches) {
					activeInstance = instance;
					break;
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

.axes-sliders {
	display: grid;
	align-items: center;
	grid-template-columns:
		auto
		2.5em
		1fr
		2.5em
		auto
		auto;
	gap: var(--small-margin) 1rem;
}

.axis-slider-container {
	display: grid;
	grid-column: 1 / -1;
	grid-template-columns: subgrid;
	align-items: center;
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

.auto-opsz {
	display: inline-block;
	margin-bottom: 1rem;
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

.axis-current {
	font-size: inherit;
	border-width: 1px;
	border-radius: 0.2em;
	background: none;
	font-weight: bold;
	width: 3em;
}

.button.hide {
	opacity: 0;
	pointer-events: none;
}

.named-instances > div {
	display: flex;
	align-items: center;
}

.named-instances .flip-state {
	margin-left: auto;
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
	font-size: var(--preview-font-size, 2rem);
	background: var(--light-grey);
	margin-top: var(--small-margin);
	padding: 1rem;
}

.instances-dropdown-label {
	margin-right: 0.5em;
}

.code {
	position: relative;
}
</style>
