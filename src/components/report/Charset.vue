<template>
	<section class="charset" id="charset">
		<h2 class="section-title">Layout Features</h2>
		<div class="content">
			<ol class="grid">
				<li
					v-for="(char, key) in chars"
					v-bind:key="key"
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
