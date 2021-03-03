<template>
	<div class="filedrop">
		<div class="upload">
			<div class="background"></div>

			<div class="info">
				"What can my font do?"
				<strong>Drop a font</strong>
				and find out!

				<label class="button upload-button">
					Pick a font!
					<input
						type="file"
						name="file"
						accept=".woff,.woff2,.ttf,.otf"
						@change="getFont"
					/>
				</label>

				<button
					type="button"
					class="button"
					@click="getExampleFont('GimletVariable-VF.woff2')"
				>
					Try with Gimlet
				</button>

				<div class="google-fonts">
					Or try a variable font from Google Fonts:
					<br />
					<select>
						<option
							v-for="(axes, family) in googleFonts"
							:key="family"
						>
							{{ family }}
						</option>
					</select>
				</div>

				<span class="errormessage" :class="{ show: error }">
					Oops! I couldn't handle that file.
				</span>
			</div>
		</div>
	</div>
</template>

<script src="./Filedrop.js"></script>
<style src="./Filedrop.css" scoped></style>
