<template>
	<div class="text-controls">
		<div>
			<label>
				Font size
				<input
					type="range"
					min="8"
					max="100"
					step="0.01"
					v-model.number="fontSize"
					@input="updateStyles()"
				/>
			</label>
		</div>
		<div v-if="font.hasLanguages">
			<label>
				Language
				<select
					@change="setLanguage($event.target.value)"
					:value="activeLanguage"
				>
					<option value="">None</option>
					<option
						v-for="lang in languages"
						:key="lang.html"
						:value="lang.html"
					>
						{{ lang.name }} ({{ lang.html }})
					</option>
				</select>
			</label>
		</div>
		<div>
			<label>
				Alignment
				<span class="alignment-buttons">
					<button
						v-html="`&nbsp;`"
						type="button"
						class="button left"
						:class="{ active: textAlign === 'left' }"
						@click="align('left')"
						alt="left align text"
					></button>
					<button
						v-html="`&nbsp;`"
						type="button"
						class="button center"
						:class="{ active: textAlign === 'center' }"
						@click="align('center')"
						alt="center align text"
					></button>
					<button
						v-html="`&nbsp;`"
						type="button"
						class="button right"
						:class="{ active: textAlign === 'right' }"
						@click="align('right')"
						alt="right align text"
					></button>
					<button
						v-html="`&nbsp;`"
						type="button"
						class="button justify"
						:class="{ active: textAlign === 'justify' }"
						@click="align('justify')"
						alt="justify text"
					></button>
					<button
						type="button"
						class="button initial"
						:class="{ active: textAlign === 'initial' }"
						@click="align('initial')"
						alt="default alignment"
					>
						Default
					</button>
				</span>
			</label>
		</div>
	</div>
</template>

<script src="./TextControls.js"></script>
<style src="./TextControls.css" scoped></style>
