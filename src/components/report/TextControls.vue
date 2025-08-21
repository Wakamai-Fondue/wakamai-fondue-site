<template>
	<div class="text-controls">
		<div class="font-size">
			<label for="font-size-slider"> Font size </label>
			<div>
				<input
					id="font-size-slider"
					class="font-size-slider"
					type="range"
					min="8"
					max="100"
					step="1"
					v-model.number="fontSize"
					@input="updateStyles()"
				/>

				<label class="optical-size-link" v-if="font.hasOpticalSize">
					<input
						type="checkbox"
						name="font-size"
						:checked="linkOpticalSize"
						@input="unlinkOpticalSize()"
					/>
					Link to optical size
				</label>
			</div>
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
		<div class="alignment-buttons">
			<span>Alignment</span>
			<button
				type="button"
				class="button left"
				:class="{ active: textAlign === 'left' }"
				@click="align('left')"
				aria-label="Left align text"
			>
				<svg aria-hidden="true" viewBox="0 0 18 18">
					<path
						d="M12 12H0v2h12zm0-8H0v2h12zM0 10h18V8H0zm0 8h18v-2H0zM0 0v2h18V0z"
					/>
				</svg>
			</button>
			<button
				type="button"
				class="button center"
				:class="{ active: textAlign === 'center' }"
				@click="align('center')"
				aria-label="Center align text"
			>
				<svg aria-hidden="true" viewBox="0 0 18 18">
					<path
						d="M4 12v2h10v-2zm-4 6h18v-2H0zm0-8h18V8H0zm4-6v2h10V4zM0 0v2h18V0z"
					/>
				</svg>
			</button>
			<button
				type="button"
				class="button right"
				:class="{ active: textAlign === 'right' }"
				@click="align('right')"
				aria-label="Right align text"
			>
				<svg aria-hidden="true" viewBox="0 0 18 18">
					<path
						d="M0 18h18v-2H0zm6-4h12v-2H6zm-6-4h18V8H0zm6-4h12V4H6zM0 0v2h18V0z"
					/>
				</svg>
			</button>
			<button
				type="button"
				class="button justify"
				:class="{ active: textAlign === 'justify' }"
				@click="align('justify')"
				aria-label="Justify text"
			>
				<svg aria-hidden="true" viewBox="0 0 18 18">
					<path
						d="M0 18h18v-2H0zm0-4h18v-2H0zm0-4h18V8H0zm0-4h18V4H0zm0-6v2h18V0z"
					/>
				</svg>
			</button>
			<button
				type="button"
				class="button initial"
				:class="{ active: textAlign === 'initial' }"
				@click="align('initial')"
				aria-label="Default alignment"
			>
				Default
			</button>
		</div>
	</div>
</template>

<script src="./TextControls.js"></script>
<style src="./TextControls.css" scoped></style>
