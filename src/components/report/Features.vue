<template>
	<section
		class="features"
		id="features"
		v-if="requiredFeatures && optionalFeatures"
	>
		<h2 class="section-title">Layout Features</h2>

		<div class="content" v-if="requiredFeatures">
			<h3>Required layout features</h3>
			<p>
				These are always turned on by the system that renders the font.
				You can’t turn them off — in fact, you're not supposed to!
				Required layout features may be applicable only to certain
				language scripts or specific languages, or in certain writing
				modes.
			</p>
			<ul class="required-features">
				<li
					v-for="(values, feature) in features"
					:key="`reqfeat_${feature}`"
				>
					<span class="opentype-label">{{ feature }}</span>
					{{ values.name }}
				</li>
			</ul>
		</div>
		<div class="content" v-if="optionalFeatures">
			<h3>Optional layout features</h3>
			<p>
				Some are turned on by default, but can be turned off. Others are
				turned off by default, but can be turned on.
			</p>

			<div
				v-for="(values, feature) in features"
				:key="`optfeat_${feature}`"
				class="feature-demo"
			>
				<div class="feature-control">
					<span class="opentype-label">{{ feature }}</span>
					{{ values.name }}
					<span
						class="state"
						:class="values.state === 'on' ? 'on' : 'off'"
					>
						<strong v-if="values.state === 'on'">on</strong>
						<strong v-else>off</strong>
						by default
					</span>
					<label>
						<input
							type="checkbox"
							@change="flipState(feature)"
							checked
						/>Show
					</label>
				</div>
				<div class="chars" :style="getFeatureStyle(feature)">
					<template v-for="char in chars">{{ char }}</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script src="./Features.js"></script>
<style src="./Features.css" scoped></style>
