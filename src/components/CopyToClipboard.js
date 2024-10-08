export default {
	props: ["content"],
	data() {
		return {
			show: false,
			failMessage: "Oops, sorry! Copying to clipboard failed.",
		};
	},
	methods: {
		copy: function () {
			try {
				if (!navigator.clipboard) {
					// Use old execCommand
					this.$refs.content.select();
					document.execCommand("copy");
					this.copySuccess();
				} else {
					// Use new clipboard API
					navigator.clipboard
						.writeText(this.content)
						.then(() => {
							this.copySuccess();
						})
						.catch(() => {
							this.copyFail();
						});
				}
			} catch (error) {
				this.copyFail();
			}
		},
		copySuccess: function () {
			// Toggle thumbs up animation
			this.show = false;
			const that = this;
			this.$nextTick().then(() => (that.show = true));
		},
		copyFail: function () {
			alert(this.failMessage);
		},
	},
};
