<template>
	<section id="metrics">
		<h2 class="section-title">Metrics</h2>
		<div class="font-metrics content">
			<div class="metrics-view-toggle">
				<label>
					<input type="radio" value="browser" v-model="view" />
					Browser
				</label>
				<label>
					<input type="radio" value="font" v-model="view" />
					Font metrics
				</label>
			</div>

			<p class="metrics-preview">
				<span
					class="metrics-preview-text"
					contenteditable="plaintext-only"
					spellcheck="false"
					autocorrect="off"
					>Hey</span
				>
				<span
					class="metrics-ruler baseline"
					data-label="Baseline"
				></span>
				<template v-if="view === 'browser'">
					<span
						class="metrics-ruler linebox-top"
						data-label="Line box top"
					></span>
					<span
						class="metrics-ruler cap-height"
						data-label="1cap"
					></span>
					<span
						class="metrics-ruler x-height"
						data-label="1ex"
					></span>
					<span
						class="metrics-ruler linebox-bottom"
						data-label="Line box bottom"
					></span>
					<span class="metrics-lh">
						<span class="metrics-lh-label">1lh</span>
						<span class="metrics-bracket metrics-bracket-lh"></span>
					</span>
					<span class="metrics-width metrics-width-em">
						<span class="metrics-bracket metrics-bracket-em"></span>
						<span class="metrics-width-label">1em</span>
					</span>
					<span class="metrics-width metrics-width-ch">
						<span class="metrics-bracket metrics-bracket-ch"></span>
						<span class="metrics-width-label">1ch</span>
					</span>
				</template>
				<template v-if="view === 'font'">
					<span
						v-for="line in fontMetricRulers"
						:key="line.key"
						class="metrics-ruler"
						:class="line.key"
						:data-label="line.label"
						:style="{ top: line.top }"
					></span>
				</template>
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
	data() {
		return {
			view: "browser",
		};
	},
	computed: {
		metrics() {
			return this.font.metrics;
		},
		fontMetricRulers() {
			if (!this.metrics) return [];

			const upm = this.metrics.unitsPerEm;
			const hhea = this.metrics.hhea;
			const os2 = this.metrics.os2;

			const offset = (value) => -value / upm;

			const lines = [
				{
					key: "hhea-ascender",
					metrictype: "hhea",
					kind: "ascender",
					top: offset(hhea.ascender),
				},
				{
					key: "hhea-descender",
					metrictype: "hhea",
					kind: "descender",
					top: offset(hhea.descender),
				},
			];

			if (os2.sTypoAscender !== undefined) {
				lines.push({
					key: "typo-ascender",
					metrictype: "Typo",
					kind: "ascender",
					top: offset(os2.sTypoAscender),
				});
			}
			if (os2.sTypoDescender !== undefined) {
				lines.push({
					key: "typo-descender",
					metrictype: "Typo",
					kind: "descender",
					top: offset(os2.sTypoDescender),
				});
			}
			if (os2.usWinAscent !== undefined) {
				lines.push({
					key: "win-ascender",
					metrictype: "Win",
					kind: "ascender",
					top: offset(os2.usWinAscent),
				});
			}
			if (os2.usWinDescent !== undefined) {
				lines.push({
					key: "win-descender",
					metrictype: "Win",
					kind: "descender",
					// Negate the value since it's stored as a postive
					top: offset(os2.usWinDescent * -1),
				});
			}
			if (os2.sCapHeight !== undefined) {
				lines.push({
					key: "cap-height",
					metrictype: null,
					kind: "Cap height",
					top: offset(os2.sCapHeight),
				});
			}
			if (os2.sxHeight !== undefined) {
				lines.push({
					key: "x-height",
					metrictype: null,
					kind: "x-Height",
					top: offset(os2.sxHeight),
				});
			}

			// Group the same values
			const groups = [];
			for (const line of lines) {
				const group = groups.find((g) => g.top === line.top);
				if (group) {
					group.metrictypes.push(line.metrictype);
				} else {
					groups.push({
						key: line.key,
						top: line.top,
						kind: line.kind,
						metrictypes: [line.metrictype],
					});
				}
			}

			// And group the labels
			return groups.map((group) => {
				const metrictypes = group.metrictypes.filter(Boolean);
				let label;
				if (metrictypes.length === 0) {
					label = group.kind;
				} else if (metrictypes.length === 1) {
					label = `${metrictypes[0]} ${group.kind}`;
				} else {
					label = `${metrictypes.join(" / ")} ${group.kind}s`;
				}

				return {
					key: group.key,
					label,
					top: `${group.top}em`,
				};
			});
		},
	},
};
</script>

<style scoped>
.metrics-view-toggle {
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
}

.metrics-preview {
	--line-thickness: 1px;

	display: grid;
	align-items: baseline;
	white-space: nowrap;
	font-family: var(--font-stack);
	font-size: 8rem;
	line-height: normal;
	padding: 0;
	padding-right: 2rem;
	/* Make room for em/ch labels */
	margin: 2.5rem 0;
}

.metrics-preview > * {
	grid-area: 1 / 1;
}

.metrics-preview-text {
	outline: 0;
	z-index: 1;
}

.metrics-ruler {
	position: relative;
	align-self: baseline;
	border-top: var(--line-thickness) solid var(--unlighterer-grey);
}

.metrics-ruler.cap-height {
	top: -1cap;
}

.metrics-ruler.x-height {
	top: -1ex;
}

.metrics-ruler.linebox-top {
	align-self: start;
}

.metrics-ruler.linebox-bottom {
	align-self: end;
}

.metrics-ruler::after {
	content: attr(data-label);
	font-family: var(--system-font-stack);
	color: var(--medium-grey);
	position: absolute;
	right: 0;
	bottom: 100%;
	font-size: 0.75rem;
	line-height: 1;
}

.metrics-lh {
	position: relative;
	margin-right: calc(-0.75rem - 1px);
	align-self: stretch;
	justify-self: end;
	display: flex;
	align-items: center;
}

.metrics-lh-label {
	font-family: var(--system-font-stack);
	font-size: 0.75rem;
	color: var(--medium-grey);
	position: absolute;
	left: 0.5rem;
}

.metrics-width {
	position: relative;
	align-self: start;
	justify-self: start;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
}

.metrics-width-em {
	flex-direction: column-reverse;
	top: -2.25rem;
	width: 1em;
}

.metrics-width-ch {
	width: 1ch;
	top: calc(1lh + calc(0.5rem + 1px));
}

.metrics-bracket {
	border: var(--line-thickness) solid var(--unlighterer-grey);
	border-top: 0;
}

.metrics-bracket-ch {
	width: 1ch;
	height: 0.5rem;
}

.metrics-bracket-em {
	width: 1em;
	height: 0.5rem;
	border-top: var(--line-thickness) solid var(--unlighterer-grey);
	border-bottom: 0;
}

.metrics-bracket-lh {
	position: absolute;
	top: 0;
	right: 0;
	width: 0.5rem;
	height: 1lh;
	border-top: var(--line-thickness) solid var(--unlighterer-grey);
	border-left: 0;
}

.metrics-width-label {
	font-family: var(--system-font-stack);
	font-size: 0.75rem;
	color: var(--medium-grey);
	white-space: nowrap;
}

.metrics-data {
	margin-top: 100px;
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
