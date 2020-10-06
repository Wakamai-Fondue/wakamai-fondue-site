// TODO: report on number of strikes + their sizes
export default {
	props: ["font"],
	data() {
		return {
			palettes: this.font.colorPalettes,
			hasPalettes:
				this.font.colorPalettes && this.font.colorPalettes.length !== 0
		};
	}
};
