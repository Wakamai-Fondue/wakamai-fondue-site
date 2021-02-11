export default {
	props: ["content"],
	data() {
		return {
			show: false
		};
	},
	methods: {
		copy: function() {
			try {
				// Copy conent of hidden input to clipboard
				this.$refs.content.select();
				document.execCommand("copy");
				// Toggle thumbs up animation
				this.show = false;
				const that = this;
				this.$nextTick().then(() => (that.show = true));
			} catch (error) {
				alert("Oops, sorry! Copying to clipboard failed.");
			}
		}
	}
};
