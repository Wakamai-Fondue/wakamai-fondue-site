<template>
	<main
		id="app"
		@drop.prevent="getFont"
		@dragover.prevent="dragStatus(true)"
		@mouseout="dragStatus(false)"
		@keydown.esc="toggleModal(true)"
		tabindex="0"
		:class="{ dragging, working }"
	>
		<TheFondue
			@getFont="getFont"
			@getExampleFont="getExampleFont"
			@toggleModal="toggleModal"
			:error="error"
		/>
		<FontReport :font="font" :isExamplefont="isExamplefont" />
		<InfoModal v-if="showModal" @toggleModal="toggleModal" />
		<div class="beta-message">
			Heya! You’re looking at the beta site. Comments, bugs or feedback?
			<a href="mailto:roel@pixelambacht.nl">Let me know!</a>
		</div>
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
