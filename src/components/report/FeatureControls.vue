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
						v-if="currentStates[feature.tag] === true"
						type="button"
						class="button button-on"
						@click="flipState(feature.tag, true)"
					>
						On
					</button>
					<button
						v-if="currentStates[feature.tag] === false"
						type="button"
						class="button button-off"
						@click="flipState(feature.tag, false)"
					>
						Off
					</button>
					<button
						v-if="currentStates[feature.tag] === null"
						type="button"
						class="button button-default"
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
				</label>
			</li>
		</ul>
	</div>
</template>

<script src="./FeatureControls.js"></script>
<style src="./FeatureControls.css" scoped></style>
