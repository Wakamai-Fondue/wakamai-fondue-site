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
		<div v-if="hasLocalization">
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
			Alignment
			<span class="alignment-buttons">
				<button
					v-html="`&nbsp;`"
					type="button"
					class="button left"
					:class="{ active: textAlign === 'left' }"
					@click="align('left')"
					title="Left align text"
				></button>
				<button
					v-html="`&nbsp;`"
					type="button"
					class="button center"
					:class="{ active: textAlign === 'center' }"
					@click="align('center')"
					title="Center align text"
				></button>
				<button
					v-html="`&nbsp;`"
					type="button"
					class="button right"
					:class="{ active: textAlign === 'right' }"
					@click="align('right')"
					title="Right align text"
				></button>
				<button
					v-html="`&nbsp;`"
					type="button"
					class="button justify"
					:class="{ active: textAlign === 'justify' }"
					@click="align('justify')"
					title="Justify text"
				></button>
				<button
					type="button"
					class="button initial"
					:class="{ active: textAlign === 'initial' }"
					@click="align('initial')"
					title="Default alignment"
				>
					Default
				</button>
			</span>
		</div>
	</div>
</template>

<script src="./TextControls.js"></script>
<style src="./TextControls.css" scoped></style>
