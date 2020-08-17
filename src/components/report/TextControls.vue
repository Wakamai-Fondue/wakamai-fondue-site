<template>
	<div class="text-controls">
		<!-- Font size! Line height! Alignment! -->

		<div>
			<label>
				Font size X
				<input
					type="range"
					min="8"
					max="100"
					step="any"
					v-model.number="fontSize"
					@input="updateStyles()"
				/>
				Y
			</label>
		</div>

		<div>
			<label>
				Line height X
				<input
					type="range"
					min="0"
					max="3"
					step="any"
					v-model.number="lineHeight"
					@input="updateStyles()"
				/>
				Y
			</label>
		</div>

		<div>
			<label>
				Alignment
				<button
					type="button"
					alt="left align text"
					@click="align('left')"
				>
					L
				</button>
				<button
					type="button"
					alt="center align text"
					@click="align('center')"
				>
					C
				</button>
				<button
					type="button"
					alt="right align text"
					@click="align('right')"
				>
					R
				</button>
				<button
					type="button"
					alt="justify text"
					@click="align('justify')"
				>
					J
				</button>
			</label>
		</div>
	</div>
</template>

<script src="./TextControls.js"></script>
<style src="./TextControls.css" scoped></style>
