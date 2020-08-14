<template>
	<div class="feature-controls">
		<h3 v-if="showTitles">OpenType Layout Features</h3>
		<ul>
			<li
				v-for="(values, feature) in features"
				:key="feature"
				:class="featureState(values.state)"
			>
				<span class="opentype-label">{{ feature }}</span>
				<span class="feature-name">{{ values.name }}</span>
				<button
					type="button"
					class="button button-on"
					@click="flipState(feature, true)"
				>
					On
				</button>
				<button
					type="button"
					class="button button-off"
					@click="flipState(feature, false)"
				>
					Off
				</button>
				<button
					type="button"
					class="button button-default"
					@click="flipState(feature, null)"
				>
					<!-- Unset -->
					<!-- Indeterminate -->
					<!-- Neither -->
					Default
				</button>
			</li>
		</ul>
	</div>
</template>

<script src="./FeatureControls.js"></script>
<style src="./FeatureControls.css" scoped></style>
