<template>
	<select
		v-if="supported"
		class="local-font-picker button"
		:disabled="permission === 'denied'"
		@mousedown="handleInteraction"
		@change="handleChange"
	>
		<option value="" disabled selected>
			{{
				permission === "denied"
					? "Local fonts denied"
					: "Pick a local font"
			}}
		</option>
		<option
			v-for="font in fonts"
			:key="font.postscriptName"
			:value="font.postscriptName"
		>
			{{ font.fullName }}
		</option>
	</select>
</template>

<script>
export default {
	props: {
		supported: {
			type: Boolean,
			default: false,
		},
		permission: {
			type: String,
			default: "prompt",
		},
	},
	emits: ["select", "permissionChange"],
	data() {
		return {
			fonts: [],
		};
	},
	mounted() {
		if (this.permission === "granted") {
			this.loadFonts();
		}
	},
	watch: {
		permission(newVal) {
			if (newVal === "granted" && this.fonts.length === 0) {
				this.loadFonts();
			}
		},
	},
	methods: {
		async loadFonts() {
			try {
				const fonts = await window.queryLocalFonts();
				this.fonts = fonts;
				this.$emit("permissionChange", "granted");
			} catch (error) {
				if (error.name === "NotAllowedError") {
					this.$emit("permissionChange", "denied");
				} else {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			}
		},
		async handleInteraction(event) {
			if (this.permission === "denied" || this.fonts.length > 0) {
				return;
			}

			// Prevent select from opening until we have fonts
			event.preventDefault();

			await this.loadFonts();
		},
		handleChange(event) {
			const postscriptName = event.target.value;
			const font = this.fonts.find(
				(f) => f.postscriptName === postscriptName
			);
			if (font) {
				this.$emit("select", font);
				// Reset to placeholder
				event.target.value = "";
			}
		},
	},
};
</script>

<style scoped>
.local-font-picker {
	margin-top: 0.75rem;
	position: relative;
	z-index: 1;
	width: 10rem;
	text-align: center;
}
</style>
