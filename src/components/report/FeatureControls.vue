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

<script src="./FeatureControls.js"></script>
<style src="./FeatureControls.css" scoped></style>
