<template>
	<section id="metrics">
		<h2 class="section-title">Metrics</h2>
		<div class="font-metrics content">
			<p class="metrics-preview" :style="previewStyle">
				<span
					class="metrics-preview-text"
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
				>
					Hey
				</span>
				<span class="metrics-rulers">
					<span class="metrics-ruler ascender"></span>
					<span
						v-if="metrics.cssMetrics.capHeight !== undefined"
						class="metrics-ruler cap-height"
					></span>
					<span
						v-if="metrics.cssMetrics.xHeight !== undefined"
						class="metrics-ruler x-height"
					></span>
					<span class="metrics-ruler baseline"></span>
					<span class="metrics-ruler descender"></span
				></span>
			</p>

			<div class="metrics-data">
				<dl class="metrics-values">
					<dt>Units per em</dt>
					<dd>{{ metrics.unitsPerEm }}</dd>

					<dt>Ascender</dt>
					<dd>{{ metrics.cssMetrics.ascender }}%</dd>

					<dt>Descender</dt>
					<dd>{{ metrics.cssMetrics.descender }}%</dd>

					<dt>Line gap</dt>
					<dd>{{ metrics.cssMetrics.lineGap }}%</dd>

					<template v-if="metrics.cssMetrics.capHeight !== undefined">
						<dt>Cap height</dt>
						<dd>{{ metrics.cssMetrics.capHeight }}%</dd>
					</template>

					<template v-if="metrics.cssMetrics.xHeight !== undefined">
						<dt>x-height</dt>
						<dd>{{ metrics.cssMetrics.xHeight }}%</dd>
					</template>
				</dl>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: ["font"],
	computed: {
		metrics() {
			return this.font.metrics;
		},
		previewStyle() {
			if (!this.metrics) return {};

			const m = this.metrics.cssMetrics;
			const em = (percent) => `${percent / 100}em`;

			const style = {
				"--ascender": em(m.ascender),
				"--descender": em(Math.abs(m.descender)),
			};
			// The miiiiiight not be defined
			if (m.capHeight !== undefined) {
				style["--cap-height"] = em(m.capHeight);
			}
			if (m.xHeight !== undefined) {
				style["--x-height"] = em(m.xHeight);
			}
			return style;
		},
	},
};
</script>

<style scoped>
.metrics-preview {
	--line-thickness: 1px;

	position: relative;
	overflow: hidden;
	font-family: var(--font-stack);
	font-size: 8rem;
	line-height: normal;
	margin: 0;
	padding: 0;
	/* Make room for descender's ruler */
	padding-bottom: 1px;
}

.metrics-preview-text {
	outline: 0;
	display: inline-block;
	width: 100%;
}

.metrics-rulers {
	position: relative;
	display: inline-block;
	vertical-align: baseline;
	width: 200%;
	margin: 0 -100%;
}

.metrics-ruler {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	border-top: var(--line-thickness) solid #000;
}

.metrics-ruler.ascender {
	top: calc(-1 * var(--ascender));
}

.metrics-ruler.cap-height {
	top: calc(-1 * var(--cap-height));
}

.metrics-ruler.x-height {
	top: calc(-1 * var(--x-height));
}

.metrics-ruler.descender {
	top: var(--descender);
}

.metrics-legend {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.875rem;
}

.legend-item::before {
	content: "";
	display: block;
	width: 1.5rem;
	height: 2px;
	background: black;
}

.metrics-data {
	margin-bottom: 2rem;
}

.metrics-values {
	display: grid;
	grid-template-columns: min-content min-content;
	gap: 0.5rem 1rem;
}

.metrics-values dt {
	font-weight: bold;
	white-space: nowrap;
}

.metrics-values dd {
	text-align: right;
}

h3 {
	margin-top: 0;
	margin-bottom: 1rem;
}
</style>
