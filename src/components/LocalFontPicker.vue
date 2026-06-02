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
		<option v-if="fonts.length > 0" value="__refresh__">
			↻ Refresh font list
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
const CACHE_KEY = "wakamai-fondue-local-fonts-support";

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
		getCache() {
			try {
				const data = localStorage.getItem(CACHE_KEY);
				return data ? JSON.parse(data) : null;
			} catch {
				return null;
			}
		},
		setCache(fonts) {
			try {
				const support = {};
				for (const font of fonts) {
					support[font.data.postscriptName] = font.isSupported;
				}
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ count: fonts.length, support })
				);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
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
				// FontData blob can fail on page reload (stale references)
				// Assume supported - loading will show error if it fails
				return true;
			}
		},
		async loadFonts() {
			try {
				const allFonts = await window.queryLocalFonts();
				this.$emit("permissionChange", "granted");

				// Checking support for these fonts is expensive, so we check
				// 'em an cache the result, and use that when available
				const cache = this.getCache();
				if (cache && cache.count === allFonts.length) {
					// Use cached data
					this.fonts = allFonts.map((font) => ({
						data: font,
						isSupported: cache.support[font.postscriptName] ?? true,
					}));
					this.loaded = true;
				} else {
					// No cache or fontcount changed
					this.fonts = allFonts.map((font) => ({
						data: font,
						isSupported: true,
					}));
					this.loaded = true;

					// Check support in background
					this.refreshFonts();
				}
			} catch (error) {
				if (error.name === "NotAllowedError") {
					this.$emit("permissionChange", "denied");
				} else {
					// eslint-disable-next-line no-console
					console.error(error);
				}
			}
		},
		async refreshFonts() {
			const allFonts = await window.queryLocalFonts();

			// Check support for each font
			const checkedFonts = [];
			const batchSize = 20;
			for (let i = 0; i < allFonts.length; i += batchSize) {
				const batch = allFonts.slice(i, i + batchSize);
				const results = await Promise.all(
					batch.map(async (font) => ({
						data: font,
						isSupported: await this.isSupported(font),
					}))
				);
				checkedFonts.push(...results);
			}

			// Update list and cache
			if (checkedFonts.some((f) => f.isSupported)) {
				this.fonts = checkedFonts;
				this.setCache(checkedFonts);
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
			const value = event.target.value;

			if (value === "__refresh__") {
				event.target.value = "";
				this.refreshFonts();
				return;
			}

			const font = this.fonts.find(
				(f) => f.data.postscriptName === value
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
	max-width: 11rem;
	text-align: center;
}
</style>
