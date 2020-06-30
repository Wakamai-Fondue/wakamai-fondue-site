<template>
	<section class="summary content" id="summary">
		<h1>Font name</h1>
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

			It has
			<strong v-if="true">no</strong>
			<strong v-else>{ getAvailableFeatures.length }</strong>
			<strong>layout feature<template v-if="true">s</template></strong
			>.
		</p>
		<table class="details">
			<tbody>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
				<tr>
					<th scope="row">Thing</th>
					<td>Value</td>
				</tr>
			</tbody>
		</table>
		<div class="features" aria-label="Font layout features">
			<strong>Layout features</strong>
			<ul>
				<li v-for="feature in features" :key="feature">
					<span class="opentype-label">{{ feature }}</span>
				</li>
			</ul>
			<p v-if="features.length == 0">None.</p>
		</div>
	</section>
</template>

<script src="./Summary.js"></script>
<style src="./Summary.css" scoped></style>
