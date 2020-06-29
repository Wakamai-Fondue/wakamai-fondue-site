<template>
	<div class="features-wrapper">
		<section class="features" id="features">
			<h2 class="section-title">Layout Features</h2>

			<div class="content" v-if="requiredFeatures">
				<h3>Required layout features</h3>
				<p>
					These are always turned on by the system that renders the
					font. You can’t turn them off — in fact, you're not supposed
					to! Required layout features may be applicable only to
					certain language scripts or specific languages, or in
					certain writing modes.
				</p>
				<ul>
					<li
						v-for="(status, feature) in features"
						:key="`reqfeat_${feature}`"
					>
						<span class="opentype-label">{{ feature }}</span>
						{{ feature }}
						<!-- TODO: human readable feature label -->
					</li>
				</ul>
			</div>

			<div class="content" v-if="optionalFeatures">
				<h3>Optional layout features</h3>
				<p>
					Some are turned on by default, but can be turned off. Others
					are turned off by default, but can be turned on.
				</p>

				<div
					v-for="(status, feature) in features"
					:key="`optfeat_${feature}`"
					class="feature-demo"
				>
					<div class="feature-control">
						<span class="opentype-label">{{ feature }}</span>
						{{ feature }}
						<!-- TODO: human readable feature label -->
						<span class="state" :class="on ? 'on' : 'off'">
							<strong v-if="on">on</strong>
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
					<div
						class="chars"
						v-bind:style="{
							fontFeatureSettings: `'${feature}' ${status}`
						}"
					>
						<template v-for="char in chars">{{ char }}</template>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script src="./Features.js"></script>
<style src="./Features.css" scoped></style>
