<template>
	<div class="feature-controls">
		<h3 v-if="showTitles">OpenType Layout Features</h3>
		<ul>
			<li
				v-for="(values, feature) in features.optional"
				:key="`featcont_${feature}`"
				:class="getClass(feature)"
			>
				<span class="feature-description">
					<span class="opentype-label">{{ feature }}</span>
					<span class="feature-name" :title="values.name">{{
						values.name
					}}</span>
				</span>
				<span class="buttons">
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
						Default
					</button>
				</span>
			</li>
		</ul>
	</div>
</template>

<script src="./FeatureControls.js"></script>
<style src="./FeatureControls.css" scoped></style>
