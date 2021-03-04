<template>
	<div class="filedrop">
		<div class="upload">
			<div class="background"></div>

			<div class="info">
				"What can my font do?"

				<label class="button upload-button">
					<span>Pick a font</span>
					and find out!
					<input
						type="file"
						name="file"
						accept=".woff,.woff2,.ttf,.otf"
						@change="getFont"
					/>
				</label>

				<div class="secondary">
					<button
						type="button"
						class="button"
						@click="getExampleFont('GimletVariable-VF.woff2')"
					>
						Try with Gimlet
					</button>

					or

					<button
						type="button"
						class="button"
						@click="toggleGoogleFonts()"
					>
						Try Google Fonts
					</button>

					<select
						:class="{ show: showGoogleFonts }"
						@change="getGoogleFont($event.target.value)"
					>
						<option
							v-for="(axes, family) in expandedGoogleFonts"
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
