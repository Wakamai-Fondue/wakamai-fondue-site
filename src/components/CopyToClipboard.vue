<template>
	<div class="copy-button">
		<textarea
			:value="content"
			ref="content"
			type="text"
			tabindex="-1"
			aria-hidden="true"
			readonly
		/>
		<button type="button" @click="copy" title="Copy to clipboard">
			📋
		</button>
		<div class="success" ref="success" v-if="show">👍</div>
	</div>
</template>

<script>
export default {
	props: ["content"],
	data() {
		return {
			show: false,
			failMessage: "Oops, sorry! Copying to clipboard failed.",
		};
	},
	methods: {
		copy() {
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
		copySuccess() {
			// Toggle thumbs up animation
			this.show = false;
			const that = this;
			this.$nextTick().then(() => (that.show = true));
		},
		copyFail() {
			alert(this.failMessage);
		},
	},
};
</script>

<style scoped>
.copy-button {
	position: absolute;
	top: 0;
	right: 0;
}

.copy-button button {
	padding: var(--small-margin);
	font-family: sans-serif;
	border: 0;
	background: none;
	position: absolute;
	top: 0;
	right: 0;
	font-size: 1.5rem;
}

/* Hidden input to hold the content */
.copy-button textarea {
	pointer-events: none;
	width: 10px;
	opacity: 0;
}

.success {
	pointer-events: none;
	position: absolute;
	top: 0;
	right: 0;
	font-size: 1.5rem;
	padding: var(--small-margin);
	animation: thumbs-up 700ms ease-out forwards;
}

@keyframes thumbs-up {
	0% {
		transform: translateY(0) scale(0.5);
	}
	0%,
	70% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: translateY(-3rem) scale(1.5);
	}
}
</style>
