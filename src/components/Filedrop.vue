<template>
	<div class="filedrop">
		<label class="upload">
			<input type="file" name="file" v-on:change="filePickFont" />
			<div class="background"></div>
			<div class="info">
				Drop a font!
			</div>
		</label>
	</div>
</template>

<script src="./Filedrop.js"></script>
<style src="./Filedrop.css" scoped></style>
