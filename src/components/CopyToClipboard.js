export default {
	props: ["content"],
	methods: {
		copy: function() {
			try {
				this.$refs.copytext.select();
				document.execCommand("copy");
			} catch (error) {
				alert("Oops, sorry! Copying to clipboard failed.");
			}
		}
	}
};
