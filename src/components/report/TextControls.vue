<template>
	<div class="text-controls">
		<div v-if="languages.length > 0">
			<label class="language-select">
				<span>Language</span>
				<select
					name="language"
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

<script>
export default {
	props: ["font", "autoOpticalSizing", "fontSize"],
	emits: ["updateTextStyles", "updateLanguage", "updateAutoOpticalSizing"],
	data() {
		return {
			textAlign: "initial",
			activeLanguage: null,
			languages: this.font.languageSystems,
		};
	},

	mounted() {
		this.updateStyles();
	},
	watch: {
		fontSize() {
			this.updateStyles();
		},
	},
	methods: {
		align(alignment) {
			this.textAlign = alignment;
			this.updateStyles();
		},
		updateStyles() {
			this.$emit("updateTextStyles", this.getTextStyles());
		},
		getTextStyles() {
			return `font-size: ${this.fontSize}px;\ntext-align: ${this.textAlign};`;
		},
		setLanguage(language) {
			this.$emit("updateLanguage", language);
		},
		updateAutoOpticalSizing() {
			this.$emit("updateAutoOpticalSizing", !this.autoOpticalSizing);
		},
	},
};
</script>

<style scoped>
.text-controls {
	margin: 2rem 0;
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
	justify-content: space-between;
}

.text-controls label {
	display: flex;
	align-items: center;
}

.language-select,
.alignment-buttons {
	display: flex;
	align-items: center;
}

.alignment-buttons .button {
	border-radius: 0;
	min-width: 0;
}

.button.left,
.button.center,
.button.right,
.button.justify {
	display: grid;
	place-items: center;
	padding: 0.325rem;
	min-width: 1.75rem;
}

.alignment-buttons svg {
	width: 0.85rem;
	height: 0.85rem;
	fill: currentColor;
}

.language-select span,
.alignment-buttons span {
	margin-right: 0.5em;
}

.alignment-buttons .button:first-of-type {
	border-top-left-radius: 0.2rem;
	border-bottom-left-radius: 0.2rem;
}

.alignment-buttons .button:last-of-type {
	border-top-right-radius: 0.2rem;
	border-bottom-right-radius: 0.2rem;
}
</style>
