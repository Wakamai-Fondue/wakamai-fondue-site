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
			:key="font.data.postscriptName"
			:value="font.data.postscriptName"
			:disabled="!font.isSupported"
		>
			{{ font.data.fullName }}
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
		// Local fonts can be .ttc collections, or old Apple
		// `true` or `typ1` fonts, which we can't parse
		async isSupported(fontData) {
			try {
				const blob = await fontData.blob();
				const header = await blob.slice(0, 4).arrayBuffer();
				const b = new Uint8Array(header);
				// TrueType: 0x00010000
				if (
					b[0] === 0x00 &&
					b[1] === 0x01 &&
					b[2] === 0x00 &&
					b[3] === 0x00
				)
					return true;
				// OpenType (CFF): "OTTO"
				if (
					b[0] === 0x4f &&
					b[1] === 0x54 &&
					b[2] === 0x54 &&
					b[3] === 0x4f
				)
					return true;
				// WOFF: "wOFF"
				if (
					b[0] === 0x77 &&
					b[1] === 0x4f &&
					b[2] === 0x46 &&
					b[3] === 0x46
				)
					return true;
				// WOFF2: "wOF2"
				if (
					b[0] === 0x77 &&
					b[1] === 0x4f &&
					b[2] === 0x46 &&
					b[3] === 0x32
				)
					return true;
				return false;
			} catch {
				return false;
			}
		},
		async loadFonts() {
			try {
				const allFonts = await window.queryLocalFonts();
				this.$emit("permissionChange", "granted");

				// Check support for each font
				const fonts = [];
				for (const font of allFonts) {
					fonts.push({
						data: font,
						isSupported: await this.isSupported(font),
					});
				}
				this.fonts = fonts;
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
				(f) => f.data.postscriptName === postscriptName
			);
			if (font && font.isSupported) {
				this.$emit("select", font.data);
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
