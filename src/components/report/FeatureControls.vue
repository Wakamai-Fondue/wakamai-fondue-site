<template>
	<div class="feature-controls">
		<h3 v-if="showTitles">OpenType Layout Features</h3>
		<ul>
			<li v-for="(value, feature) in features" :key="feature">
				<button
					type="button"
					class="button"
					:class="{ active: value }"
					@click="flipState(feature)"
				>
					{{ feature }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script src="./FeatureControls.js"></script>
<style src="./FeatureControls.css" scoped></style>
