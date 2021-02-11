<template>
	<div class="copy-button">
		<button type="button" @click="copy">📋</button>
		<input
			:value="content"
			ref="copytext"
			type="text"
			tabindex="-1"
			aria-hidden="true"
			readonly
		/>
	</div>
</template>

<script src="./CopyToClipboard.js"></script>
<style src="./CopyToClipboard.css" scoped></style>
