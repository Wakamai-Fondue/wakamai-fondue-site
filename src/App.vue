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

.circle-background {
	background-color: transparent;
	background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3e%3cpath fill='%23dfd6b3' d='M421.7 799.7c-91.3 0-180.8-26.1-257.2-76.2-32.9-21.6-63-46.7-87.3-77.8-22.9-29.4-40.9-62.6-53.9-97.5C10.2 512.9 2.1 475.6.3 438c-2-40.6 5.4-80.9 12.5-120.8 4-22.3 9.2-44.4 17.3-65.6 8.1-21.2 19-41.5 31.2-60.6 10.7-16.7 22.6-32.5 34.5-48.4 12.5-16.8 24.3-33.7 39.9-47.8 27.7-25.1 61.5-42.2 95.8-56.3 19.6-8 38.6-18 58.5-25.3 21.4-7.9 43.7-9.2 66.3-10.8C376.5 1 396.7.2 416.9.3c20.9.1 43.3-.9 63.7 3.8 43.4 10 87.1 21.1 126.4 42.7C676.6 85.2 728.4 150.4 759 223c16.4 38.9 27.1 80 33.4 121.6 6.6 43.4 9.9 88.3 5.3 132.1-7.9 75.3-47.3 145.8-97.8 201-13.8 15.1-28.6 29.2-44.2 42.3-15.5 13.1-31.6 26.5-49.8 35.6-18.6 9.3-38.6 15.5-58.5 21.5-21.9 6.6-43.6 14.6-66.3 18.3-19.5 3.4-39.5 4.3-59.4 4.3z'/%3e%3c/svg%3e");
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
