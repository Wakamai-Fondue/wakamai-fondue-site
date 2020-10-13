<template>
	<main
		id="app"
		@drop.prevent="getFont"
		@dragover.prevent="dragStatus(true)"
		@mouseout="dragStatus(false)"
		:class="{ dragging }"
	>
		<Hero
			v-on:getFont="getFont"
			v-on:getExampleFont="getExampleFont"
			:error="error"
		/>
		<Report :font="font" />
	</main>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
