<template>
	<section class="charset" id="charset">
		<h2 class="section-title">Character Set</h2>
		<div class="content" :class="showFeatures ? 'show-features' : ''">
			<div class="char-bar">
				<span
					>{{ showFeatures ? allCharCount : charCount }} glyphs</span
				>
				<label v-if="hasAxes">
					<input
						type="checkbox"
						name="toggle-axes"
						checked
						@change="flipAxes()"
					/>Variable axes
				</label>
				<label>
					<input
						type="checkbox"
						name="toggle-features"
						checked
						@change="flipFeatures()"
					/>Layout features
				</label>
			</div>
			<Sliders
				:variables="variables"
				:showAxes="true"
				@updateAxes="updateAxes"
				v-if="showAxes"
				class="char-sliders"
			/>
			<ol class="grid" :style="axesStyle">
				<li
					v-for="(char, key) in chars"
					:key="key"
					:class="char.feature ? 'feature' : 'code'"
				>
					<span class="char">{{ char.char }}</span>
					<span class="label" v-if="!char.feature">{{
						char.code
					}}</span>
					<span class="label" v-if="char.feature">{{
						char.feature
					}}</span>
				</li>
			</ol>
		</div>
	</section>
</template>

<script src="./Charset.js"></script>
<style src="./Charset.css" scoped></style>
