<template>
	<main
		id="app"
		@drop.prevent="getFont"
		@dragover.prevent="dragStatus(true)"
		@mouseout="dragStatus(false)"
		@keydown.esc="toggleModal(true)"
		tabindex="0"
		:class="{ dragging }"
	>
		<Hero
			v-on:getFont="getFont"
			v-on:getExampleFont="getExampleFont"
			v-on:toggleModal="toggleModal"
			:error="error"
		/>
		<Report :font="font" :isExamplefont="isExamplefont" />
		<Modal v-if="showModal" v-on:toggleModal="toggleModal" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
