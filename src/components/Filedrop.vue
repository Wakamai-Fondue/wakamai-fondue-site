<template>
	<div class="filedrop">
		<label class="upload">
			<div class="background"></div>
			<input
				type="file"
				name="file"
				v-on:change="getFont"
				accept=".woff,.woff2,.ttf,.otf"
			/>
			<div class="info">
				What can my font do?
				<strong>Drop a font here</strong>
				and find out!
				<button
					type="button"
					v-on:click="getExampleFont('Bungee-Regular.ttf')"
					class="demo-font"
				>
					Try with Bungee!
				</button>
			</div>
		</label>
	</div>
</template>

<script src="./Filedrop.js"></script>
<style src="./Filedrop.css" scoped></style>
