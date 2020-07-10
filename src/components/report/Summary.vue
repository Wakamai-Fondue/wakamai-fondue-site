<template>
	<section class="summary content" id="summary">
		<h1>{{ summary.family }} {{ summary.subfamily }}</h1>
		<p class="oneliner">
			This is
			<template v-if="true">an</template>
			<template v-else>a</template>

			<strong>{ getFontFormat }</strong>

			<strong v-if="true">variable</strong>
			<strong v-if="true">color</strong>
			font with
			<strong>{ numCharacters } characters.</strong>

			<template v-if="true">
				It has
				<strong>{ numAxes }</strong>
				and
				<strong>{ numNamedInstances }</strong>.
			</template>

			<template v-if="true">
				It has
				<strong>{ listColorFormats }</strong>
				color glyphs.
			</template>
			It has {{ Object.features }}
			<strong v-if="featureLength === 0">no</strong>
			<strong v-else>{{ featureLength }}</strong>
			<strong>
				layout feature<template v-if="featureLength !== 1"
					>s</template
				> </strong
			>.
		</p>
		<table class="details">
			<tbody>
				<tr v-for="(value, key) in summary" :key="key">
					<th scope="row">{{ key }}</th>
					<td>{{ value }}</td>
				</tr>
			</tbody>
		</table>
		<div class="features" aria-label="Font layout features">
			<strong>Layout features</strong>
			<ul>
				<li v-for="(featureData, feature) in features" :key="feature">
					<span class="opentype-label">{{ feature }}</span>
				</li>
			</ul>
			<p v-if="features.length == 0">None.</p>
		</div>
	</section>
</template>

<script src="./Summary.js"></script>
<style src="./Summary.css" scoped></style>
