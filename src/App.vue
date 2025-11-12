<template>
	<div
		@drop.prevent="getFont"
		@dragover.prevent="dragStatus(true)"
		@mouseout="dragStatus(false)"
		@keydown.esc="toggleInfoModal(true)"
		tabindex="0"
		:class="{ dragging, working }"
		:style="{ '--scrollbar-width': scrollbarWidth }"
	>
		<TheFondue
			@getFont="getFont"
			@getExampleFont="getExampleFont"
			@toggleInfoModal="toggleInfoModal"
			:error="error"
		/>
		<FontReport :font="font" :isExamplefont="isExamplefont" />
		<InfoModal v-if="showInfoModal" @toggleInfoModal="toggleInfoModal" />
	</div>
</template>

<script>
import TheFondue from "./components/TheFondue.vue";
import FontReport from "./components/FontReport.vue";
import InfoModal from "./components/InfoModal.vue";

export default {
	components: {
		TheFondue,
		FontReport,
		InfoModal,
	},
	data() {
		return {
			font: false,
			dragging: false,
			working: false,
			error: false,
			showInfoModal: false,
			isExamplefont: false,
			fromDataBuffer: null,
			scrollbarWidth:
				window.innerWidth - document.body.clientWidth + "px",
		};
	},
	async mounted() {
		// Load engine after upload UI is in place
		try {
			const engine = await import("@wakamai-fondue/engine");
			this.fromDataBuffer = engine.fromDataBuffer;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	},
	methods: {
		dragStatus(status) {
			this.dragging = status;
			if (status) {
				// If a new file is being dragged, remove any
				// old error messages so we don't confuse the user
				this.error = false;
			}
		},
		loadFondue(fileOrBlob, data, fileName, that) {
			// Destroy old font prop so Vue picks up change
			that.font = false;

			// Bail if engine hasn't loaded yet
			if (!that.fromDataBuffer) {
				that.error = true;
				that.working = false;
				return;
			}

			that.fromDataBuffer(data, fileName)
				.then((fondue) => {
					that.error = false;
					that.injectStyleSheet(fileOrBlob);
					that.font = fondue;
					that.$nextTick(() => {
						that.working = false;
					});
				})
				.catch(function () {
					that.error = true;
					that.working = false;
				});
		},
		getFont(e) {
			this.working = true;

			e.preventDefault();
			this.dragging = false;
			this.isExamplefont = false;

			const that = this;

			let files = e.target.files || e.dataTransfer.files;
			if (!files) {
				this.working = false;
				return;
			}

			requestAnimationFrame(() => {
				// Loop over all uploaded files
				[...files].forEach((file) => {
					this.loadFont(file, file.name, that);
				});
			});
		},
		loadFont(fileOrBlob, filename, that) {
			const reader = new FileReader();

			reader.onload = function () {
				const data = reader.result;
				that.loadFondue(fileOrBlob, data, filename, that);
			};

			reader.onerror = function (error) {
				// TODO: error handling
				// eslint-disable-next-line no-console
				console.error(error);
			};

			reader.readAsArrayBuffer(fileOrBlob);
		},
		getExampleFont(filename) {
			this.working = true;

			const that = this;

			requestAnimationFrame(() => {
				// Grab font from server
				const request = new XMLHttpRequest();
				request.open("GET", `/${filename}`, true);
				request.responseType = "blob";
				request.send();

				request.onload = function () {
					const blob = request.response;
					that.loadFont(blob, filename, that);
					that.isExamplefont = true;
				};
			});
		},
		injectStyleSheet(file) {
			// Use the "uploaded" font on the page
			const id = "wakamai-fondue-custom-stylesheet";
			let style = document.getElementById(id);

			// Clean up previous instance of stylesheet
			if (!style) {
				style = document.createElement("style");
				style.id = id;
				document.head.appendChild(style);
			}

			// Inject new stylesheet
			const objectURL = URL.createObjectURL(file);
			style.innerHTML = "";
			style.appendChild(
				document.createTextNode(
					`@font-face { font-family: 'wakamai-fondue'; src: url('${objectURL}'); }`
				)
			);
		},
		toggleInfoModal(forceClose) {
			if (forceClose) {
				this.showInfoModal = false;
			} else {
				this.showInfoModal = !this.showInfoModal;
			}
		},
	},
};
</script>

<style>
:root {
	--yellow: #d8b33d;
	--green: #5f8e5d;
	--red: #cd4e49;
	--offwhite: #dfd6b3;

	--dark-grey: #444;
	--medium-grey: #888;

	--unlighterer-grey: #aaa;
	--unlighter-grey: #bbb;
	--unlight-grey: #ddd;
	--light-grey: #eee;

	/* Using this as opposed to 0.25em/0.25rem to avoid rounding
	   weirdness that creates uneven gaps */
	--small-margin: 4px;

	--font-stack: wakamai-fondue, notdef;
	--system-font-stack: system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell,
		sans-serif;

	--max-content-width: 68rem;

	--nav-height: 4rem;
}

@font-face {
	font-family: notdef;
	src: url("assets/AND-Regular.woff2");
}

html {
	box-sizing: border-box;
	min-height: 320px;
	min-width: 320px;
	font-family: var(--system-font-stack);
	scroll-behavior: smooth;
	scroll-padding-top: calc(var(--nav-height) + 1rem);
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

ol,
ul {
	list-style: none;
}

table {
	font-family: inherit;
	border-collapse: collapse;
	border-spacing: 0;
}

select,
button {
	font-family: inherit;
	font-size: inherit;
}

a {
	color: inherit;
}

/* Global styles */
h2 {
	font-size: 2rem;
	padding: 2.5rem 0;
	margin: 8rem 0 4rem 0;
	background: var(--green);
	color: white;
	text-align: center;
}

h3 {
	color: var(--red);
	font-weight: bold;
	font-size: 1.25rem;
	margin: 2rem 0 1rem 0;
}

.content {
	margin-left: auto;
	margin-right: auto;
	max-width: var(--max-content-width);
	padding: 0 1rem;
}

.opentype-label {
	font-family: monospace;
	border-radius: 99999px;
	display: inline-flex;
	align-items: center;
	height: 1.5rem;
	padding: 0 0.75rem;
	margin-right: var(--small-margin);
	background: var(--offwhite);
}

.button {
	padding: 0.25rem 1rem;
	border-radius: 0.2rem;
	margin: 0;
	font-size: 0.85rem;
	background: var(--unlight-grey);
	cursor: pointer;
	min-width: 6em;
	user-select: none;
	color: black;
	border: 1px solid rgba(255, 255, 255, 0.25);
	border-right: 1px solid rgba(0, 0, 0, 0.25);
	border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.button:hover {
	box-shadow: inset 0 0 999px rgba(0, 0, 0, 0.15);
}

.button[disabled] {
	background: var(--unlighterer-grey);
}

.button.active {
	background: var(--medium-grey);
	color: white;
}

.button.active:hover {
	box-shadow: inset 0 0 999px rgba(0, 0, 0, 0.4);
}

.button.on {
	background: var(--green);
	color: white;
}

.button.off {
	background: var(--red);
	color: white;
}

@media screen and (prefers-reduced-motion: reduce) {
	*,
	*:before,
	*:after {
		animation: none !important;
		transition: none !important;
	}
}
</style>
