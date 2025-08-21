<template>
	<div class="filedrop">
		<label class="upload">
			<div class="background"></div>
			<input
				type="file"
				name="file"
				accept=".woff,.woff2,.ttf,.otf"
				@change="getFont"
			/>
			<div class="info">
				"What can my font do?"
				<strong>Drop a font</strong>
				and find out!
				<button
					type="button"
					class="button on"
					@click="getExampleFont('GimletVariable-VF.woff2')"
				>
					Try with Gimlet!
				</button>
				<span class="errormessage" :class="{ show: error }">
					Oops! I couldn't handle that file.
				</span>
			</div>
		</label>
	</div>
</template>

<script src="./FileDrop.js"></script>
<style src="./FileDrop.css" scoped></style>
