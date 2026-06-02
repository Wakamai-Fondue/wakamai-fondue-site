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
					: "Or pick a local font"
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
			loaded: false,
		};
	},
	mounted() {
		if (this.permission === "granted") {
			this.loadFonts();
		}
	},
	watch: {
		permission(newVal) {
			if (newVal === "granted" && !this.loaded) {
				this.loadFonts();
			}
		},
	},
	methods: {
		async loadFonts() {
			try {
				this.fonts = await window.queryLocalFonts();
				this.$emit("permissionChange", "granted");
				this.loaded = true;
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
			if (this.permission === "denied" || this.loaded) {
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
				event.target.value = "";
			}
		},
	},
};
</script>

<style scoped>
.local-font-picker {
	margin-top: 1.25rem;
	position: relative;
	z-index: 1;
	max-width: 11rem;
	text-align: center;
}
</style>
