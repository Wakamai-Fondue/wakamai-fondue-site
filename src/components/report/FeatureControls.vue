<template>
	<div class="feature-controls" :class="{ long }">
		<h3 v-if="showTitles">OpenType Layout Features</h3>
		<ul>
			<li
				v-for="feature in optionalFeatures"
				:key="`featcont_${feature.tag}`"
			>
				<label>
					<button
						v-if="currentStates[feature.tag] >= 1"
						type="button"
						class="button on"
						@click="flipState(feature.tag, 1)"
					>
						On
					</button>
					<button
						v-if="currentStates[feature.tag] === 0"
						type="button"
						class="button off"
						@click="flipState(feature.tag, 0)"
					>
						Off
					</button>
					<button
						v-if="currentStates[feature.tag] === null"
						type="button"
						class="button active"
						@click="flipState(feature.tag, null)"
					>
						Default
					</button>
					<span class="feature-description">
						<span class="opentype-label">{{ feature.tag }}</span>
						<span class="feature-name" :title="feature.name">{{
							feature.name
						}}</span>
					</span>
					<select
						v-if="alternateCount(feature.tag) >= 1"
						@change="
							toggleAlternate(feature.tag, $event.target.value)
						"
						class="alternate-select"
					>
						<option
							v-for="n in alternateCount(feature.tag)"
							:key="`featcont_${feature.tag}_${n}`"
						>
							{{ n }}
						</option>
					</select>
				</label>
			</li>
		</ul>
	</div>
</template>

<script>
// Features can have three states in the UI:
// true  = turn explicitly ON in CSS
// false = turn explicitly OFF in CSS
// null  = leave at default, do not set anything in CSS

export default {
	props: ["font", "showTitles"],
	data() {
		return {
			features: this.font.features,
			currentStates: {},
			alternateStates: {},
		};
	},
	computed: {
		optionalFeatures() {
			return this.features.filter((f) => f.state !== "fixed");
		},
		long() {
			return this.optionalFeatures.length > 8;
		},
	},
	mounted: function () {
		this.updateStyles();
	},
	methods: {
		featureChars() {
			// Try to return the "best" layout features
			if (
				"DFLT" in this.font.featureChars &&
				"dflt" in this.font.featureChars["DFLT"]
			) {
				return this.font.featureChars["DFLT"]["dflt"];
			} else if (
				"latn" in this.font.featureChars &&
				"dflt" in this.font.featureChars["latn"]
			) {
				return this.font.featureChars["latn"]["dflt"];
			} else if (Object.keys(this.font.featureChars).length > 0) {
				// If all else fails, return first
				const first = Object.keys(this.font.featureChars)[0];
				return Object.values(this.font.featureChars[first])[0];
			} else {
				return {};
			}
		},
		flipState(feature) {
			const states = [1, 0, null];
			// If feature is on and showing alternates (so it's state >= 1),
			// treat it as simply being on (1).
			const currentState =
				this.currentStates[feature] >= 1
					? 1
					: this.currentStates[feature];
			const currentIndex = states.indexOf(currentState);
			const nextIndex = (currentIndex + 1) % states.length;
			if (states[nextIndex] === 1 && feature in this.alternateStates) {
				// When turning back on, show previously picked alternate
				this.currentStates[feature] = this.alternateStates[feature];
			} else {
				this.currentStates[feature] = states[nextIndex];
			}
			this.updateStyles();
		},
		showAlternates(feature) {
			return this.currentStates[feature] >= 1;
		},
		alternateCount(feature) {
			let alternateCount = 0;
			// Return the highest number of alternates for this feature
			if (this.featureChars[feature]) {
				for (const lookup of this.featureChars[feature]["lookups"]) {
					alternateCount = Math.max(
						...lookup["alternateCount"],
						alternateCount
					);
				}
			}
			return alternateCount;
		},
		updateStyles: function () {
			this.$emit("updateFeatureStyles", this.getFeatureStyles());
		},
		getFeatureStyles: function () {
			let styles = "";
			let glue = "";
			let counter = 0;
			let maxProps = 7;
			for (const feature of this.optionalFeatures) {
				let state;
				if (this.currentStates[feature.tag] !== undefined) {
					// CSS state exists, use it
					state = this.currentStates[feature.tag];
				} else {
					// No CSS state yet, set to "default" (null)
					this.currentStates[feature.tag] = null;
					state = null;
				}
				if (state === null) continue;
				styles += `${glue} "${feature.tag}" ${state}`;
				glue = ",";
				// Poor man's code formatting
				if (++counter % maxProps === 0) {
					glue = `,\n                      `;
				}
			}
			if (styles) {
				return `font-feature-settings:${styles};`;
			} else {
				return "";
			}
		},
		toggleAlternate: function (feature, value) {
			this.currentStates[feature] = value;
			this.alternateStates[feature] = value;

			this.updateStyles();
		},
	},
};
</script>

<style scoped>
.feature-controls {
	margin: 2rem 0;
}

.feature-controls.long ul {
	columns: 3;
}

.feature-controls.long li {
	list-style: initial;
	color: transparent;
}

.feature-controls label {
	margin-bottom: var(--small-margin);
	display: flex;
	cursor: pointer;
	color: black;
}

.feature-description {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
	margin-left: var(--small-margin);
}

.feature-name {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.alternate-select {
	min-width: 3em;
	margin-left: var(--small-margin);
}
</style>
