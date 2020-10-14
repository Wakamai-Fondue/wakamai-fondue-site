<template>
	<main
		id="app"
		@drop.prevent="getFont"
		@dragover.prevent="dragStatus(true)"
		@mouseout="dragStatus(false)"
		@keydown.esc="closeModal(true)"
		tabindex="0"
		:class="{ dragging }"
	>
		<Hero
			v-on:getFont="getFont"
			v-on:getExampleFont="getExampleFont"
			v-on:closeModal="closeModal"
			:error="error"
		/>
		<Report :font="font" />
		<Modal v-if="showModal" v-on:closeModal="closeModal" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
