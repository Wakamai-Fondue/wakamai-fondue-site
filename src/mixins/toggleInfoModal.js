export default {
	emits: ["toggleInfoModal"],
	methods: {
		toggleInfoModal() {
			this.$emit("toggleInfoModal");
		},
	},
};
