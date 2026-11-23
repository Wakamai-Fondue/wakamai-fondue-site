<template>
	<section class="features" id="features">
		<h2 class="section-title">Layout Features</h2>

		<div class="content" v-if="hasRequiredFeatures">
			<h3>Required layout features</h3>
			<p>
				These are always turned on by the system that renders the font.
				You can’t turn them off — in fact, you're not supposed to!
				Required layout features may be applicable only to certain
				language scripts or specific languages, or in certain writing
				modes.
			</p>
			<ul class="required-features">
				<li
					v-for="feature in requiredFeatures"
					:key="`reqfeat_${feature.tag}`"
				>
					<span class="opentype-label">{{ feature.tag }}</span>
					{{ feature.uiName || feature.name }}
				</li>
			</ul>
		</div>
		<div class="content" v-if="hasOptionalFeatures">
			<h3>Optional layout features</h3>
			<p>
				Some are turned on by default, but can be turned off. Others are
				turned off by default, but can be turned on.
			</p>

			<div
				v-for="feature in optionalFeatures"
				:key="`optfeat_${feature.tag}`"
				class="feature-demo"
			>
				<div class="feature-control" :id="`feature-${feature.tag}`">
					<span class="opentype-label">{{ feature.tag }}</span>
					{{ feature.uiName || feature.name }}
					<span
						class="state"
						:class="feature.state === 'on' ? 'on' : 'off'"
					>
						<strong v-if="feature.state === 'on'">On</strong>
						<strong v-else>Off</strong>
						by default
					</span>
					<label class="flip-state">
						<input
							type="checkbox"
							@change="flipState(feature.tag)"
							:disabled="!hasPreview(feature)"
							checked
						/><span>Show</span>
					</label>
				</div>

				<template v-if="getCustomFeatureText(feature.tag)">
					<div class="sample">
						<span
							:style="getFeatureStyle(feature.tag)"
							class="chars"
							contenteditable="plaintext-only"
							spellcheck="false"
							autocorrect="off"
							>{{ getCustomFeatureText(feature.tag) }}</span
						>
					</div>
					<div class="code">
						<CopyToClipboard
							:content="getFeatureCSS(feature.tag)"
						/>
						<Prism
							language="css"
							:key="`code_custom_${feature.tag}`"
							>{{ getFeatureCSS(feature.tag) }}</Prism
						>
					</div>
				</template>

				<template v-else-if="isValidFeature(feature)">
					<template
						v-for="(lookup, index) in featureChars[feature.tag][
							'lookups'
						]"
					>
						<div
							v-if="lookup['type'] === 3"
							:key="`lookup_3_${feature.tag}_${index}`"
							class="sample"
						>
							<span
								:style="getFeatureStyle(feature.tag)"
								:data-type="lookup['typeName']"
								class="chars"
								contenteditable="plaintext-only"
								spellcheck="false"
								autocorrect="off"
							>
								<template
									v-for="(char, index) in lookup['input']"
								>
									<span
										v-for="n in lookup['alternateCount'][
											index
										]"
										:key="`type3_${char}_${n}`"
										:style="getFeatureStyle(feature.tag, n)"
										:title="`font-feature-settings: &quot;${feature.tag}&quot; ${n};`"
									>
										{{ char }} </span>{{ " " }}
								</template>
							</span>
						</div>

						<template v-else-if="lookup['type'] === 6"></template>

						<div
							v-else
							:key="`lookup_6_${feature.tag}_${index}`"
							class="sample"
						>
							<span
								:style="getFeatureStyle(feature.tag)"
								:data-type="lookup['typeName']"
								class="chars"
								contenteditable="plaintext-only"
								spellcheck="false"
								autocorrect="off"
							>
								{{ lookup["input"].join(" ") }}
							</span>
						</div>
					</template>

					<div
						v-if="
							featureChars[feature.tag]['summary'][
								'uniqueCombinations'
							].length
						"
						class="sample"
					>
						<span
							:style="getFeatureStyle(feature.tag)"
							data-summary="Randomly generated sample of possible combinations"
							class="chars summarized"
							contenteditable="plaintext-only"
							spellcheck="false"
							autocorrect="off"
						>
							{{ getCombinations(feature) }}
						</span>

						<div
							v-if="
								featureChars[feature.tag]['summary'][
									'isCapped'
								] && !expandedFeatures[feature.tag]
							"
							class="max-message"
						>
							Showing {{ MAX_SHOWN }} of
							<template
								v-if="
									featureChars[feature.tag]['summary'][
										'exceededMax'
									]
								"
								>more than 10000</template
							>
							<template v-else>{{
								featureChars[feature.tag]["summary"][
									"totalCombinations"
								]
							}}</template>
							possible combinations.
							<button
								v-if="
									!featureChars[feature.tag]['summary'][
										'exceededMax'
									]
								"
								class="button"
								@click="showAllCombinations(feature.tag)"
							>
								Show all
							</button>
						</div>
					</div>

					<div class="code">
						<CopyToClipboard
							:content="getFeatureCSS(feature.tag)"
						/>
						<Prism language="css" :key="`code_${feature.tag}`">{{
							getFeatureCSS(feature.tag)
						}}</Prism>
					</div>
				</template>
				<div
					v-else-if="!hasCombinations(feature)"
					class="feature-message"
				>
					There's no preview for this feature.
				</div>
				<div v-else class="feature-message">
					This feature only works together with another feature.
				</div>

				<template
					v-for="(chars, combinedTag) in featureChars[feature.tag]?.[
						'combinesWith'
					]"
					:key="`combined_${feature.tag}_${combinedTag}`"
				>
					<div class="feature-control">
						<span class="opentype-label">{{ feature.tag }}</span>
						<span class="plus">and</span>
						<span class="opentype-label">{{ combinedTag }}</span>
						{{ getFeatureName(combinedTag) }}
					</div>
					<div class="sample">
						<span
							:style="
								getCombinedFeatureStyle(
									feature.tag,
									combinedTag
								)
							"
							class="chars"
							contenteditable="plaintext-only"
							spellcheck="false"
							autocorrect="off"
						>
							{{
								getCombinedChars(feature.tag, combinedTag).join(
									" "
								)
							}}
						</span>
						<div
							v-if="
								getCombinedChars(feature.tag, combinedTag)
									.length < chars.length
							"
							class="feature-message"
						>
							Showing {{ MAX_SHOWN }} of
							{{ chars.length }} characters.
							<button
								class="button"
								@click="
									showAllCombinations(
										`${feature.tag}_${combinedTag}`
									)
								"
							>
								Show all
							</button>
						</div>
					</div>
					<div class="code">
						<CopyToClipboard
							:content="
								getCombinedFeatureCSS(feature.tag, combinedTag)
							"
						/>
						<Prism
							language="css"
							:key="`code_${feature.tag}_${combinedTag}`"
							>{{
								getCombinedFeatureCSS(feature.tag, combinedTag)
							}}</Prism
						>
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<script>
import Prism from "vue-prism-component";
import CopyToClipboard from "@/components/CopyToClipboard.vue";
import { usePreferences } from "@/composables/usePreferences.js";
import { useVariableStyles } from "@/composables/useVariableStyles.js";

const MAX_SHOWN = 250;

export default {
	props: ["font"],
	components: {
		Prism,
		CopyToClipboard,
	},
	setup() {
		const { previewTexts } = usePreferences();
		const { variableStyles } = useVariableStyles();
		return { previewTexts, variableStyles, MAX_SHOWN };
	},
	data() {
		return {
			currentStates: [],
			expandedFeatures: {},
			hasOptionalFeatures:
				this.font.features.filter((f) => f.state !== "fixed").length >
				0,
			hasRequiredFeatures:
				this.font.features.filter((f) => f.state === "fixed").length >
				0,
			featureChars: this.getFeatureChars(),
		};
	},
	computed: {
		optionalFeatures() {
			return this.font.features.filter((f) => f.state !== "fixed");
		},
		requiredFeatures() {
			return this.font.features.filter((f) => f.state === "fixed");
		},
	},
	methods: {
		getFeatureChars() {
			// Try to return the "best" layout features
			if (
				"DFLT" in this.font.featureChars &&
				"dflt" in this.font.featureChars["DFLT"]
			) {
				return this.font.featureChars["DFLT"]["dflt"];
			} else if (
				"latn" in this.font.featureChars &&
				"dflt" in this.font.featureChars["latn"]
			) {
				return this.font.featureChars["latn"]["dflt"];
			} else if (Object.keys(this.font.featureChars).length > 0) {
				// If all else fails, return first
				const first = Object.keys(this.font.featureChars)[0];
				return Object.values(this.font.featureChars[first])[0];
			} else {
				return {};
			}
		},
		flipState(feature) {
			this.currentStates[feature] =
				this.currentStates[feature] === 0 ? 1 : 0;
		},
		hasPreview(feature) {
			return (
				this.getCustomFeatureText(feature.tag) ||
				this.isValidFeature(feature) ||
				this.hasCombinations(feature)
			);
		},
		hasCombinations(feature) {
			const combinesWith = this.featureChars[feature.tag]?.combinesWith;
			return combinesWith && Object.keys(combinesWith).length > 0;
		},
		isValidFeature(feature) {
			return (
				this.featureChars[feature.tag] &&
				this.featureChars[feature.tag]["lookups"].length &&
				this.featureChars[feature.tag]["lookups"][0]["input"].length
			);
		},
		// Use onState for features that take a specific number
		// instead of just 0 or 1.
		getFeatureStyle(feature, onState = 1) {
			const offState = 0;
			let state;
			if (this.currentStates[feature] !== undefined) {
				// CSS state exists, use it
				state = this.currentStates[feature];
			} else {
				// No CSS state yet, create one based off default state
				this.currentStates[feature] = 1;
				state = 1;
			}
			const featureSettings = `font-feature-settings:"${feature}" ${
				state ? onState : offState
			};`;
			return this.variableStyles + featureSettings;
		},
		getFeatureName(tag) {
			const feature = this.font.features.find((f) => f.tag === tag);
			return feature.uiName || feature.name;
		},
		getCombinedFeatureStyle(feature, combinedFeature) {
			const state = this.currentStates[feature] === 0 ? 0 : 1;
			const featureSettings = `font-feature-settings:"${combinedFeature}" 1, "${feature}" ${state};`;
			return this.variableStyles + featureSettings;
		},
		getFeatureCSS(feature) {
			// Type 3 lookups are non-boolean, deal with those if we got 'em
			if (this.featureChars[feature]?.lookups) {
				const type3Lookup = this.featureChars[feature]["lookups"].find(
					(lookup) => lookup.type === 3
				);

				if (type3Lookup) {
					const maxAlternates = this.getMaxAlternates(type3Lookup);
					if (maxAlternates > 1) {
						return `font-feature-settings: "${feature}" 1; /* Use value 1 to ${maxAlternates} for all alternates */`;
					}
				}
			}

			return `font-feature-settings: "${feature}";`;
		},
		getCombinedFeatureCSS(feature, combinedFeature) {
			return `font-feature-settings: "${feature}", "${combinedFeature}";`;
		},
		showAllCombinations(tag) {
			this.expandedFeatures[tag] = true;
		},
		getCombinedChars(feature, combinedFeature) {
			const chars =
				this.featureChars[feature]["combinesWith"][combinedFeature];
			if (this.expandedFeatures[`${feature}_${combinedFeature}`]) {
				return chars;
			}
			return chars.slice(0, MAX_SHOWN);
		},
		getCombinations(feature) {
			const summary = this.featureChars[feature.tag]["summary"];
			const isExpanded = this.expandedFeatures[feature.tag];
			const combinations = isExpanded
				? summary["allCombinations"]
				: summary["uniqueCombinations"];

			if (feature.tag === "frac") {
				const allChars = new Set();
				combinations.forEach((combo) => {
					[...combo].forEach((char) => allChars.add(char));
				});

				// Check if font supports digits and slashes
				const hasDigits = [
					"0",
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
				].some((d) => allChars.has(d));
				const hasSlash = allChars.has("/") || allChars.has("⁄");

				if (hasDigits && hasSlash) {
					// Show human readable pre-made examples if supported...
					return "1/1 1/2 1/3 1/4 1/5 1/6 1/7 1/8 1/9 2/3 4/5 6/7 8/9 10/10";
				} else {
					// ...else, show actual combinations
					return combinations.join(" ");
				}
			} else {
				return combinations.join(" ");
			}
		},
		getMaxAlternates(lookup) {
			if (!lookup.alternateCount || lookup.alternateCount.length === 0) {
				return 0;
			}
			return Math.max(...lookup.alternateCount);
		},
		getCustomFeatureText(tag) {
			return this.previewTexts.features[tag] || null;
		},
	},
};
</script>

<style scoped>
.features p {
	margin: 1rem 0;
}

.features .content + .content {
	margin-top: 5rem;
}

.required-features li {
	margin-bottom: var(--small-margin);
}

.feature-demo + .feature-demo {
	margin-top: 5rem;
}

.state {
	margin-left: auto;
	margin-right: 0.5em;
	color: var(--yellow);
}

.state.on {
	color: var(--green);
}

.flip-state [disabled] + span {
	color: var(--unlighterer-grey);
}

.required-features li,
.feature-control {
	display: flex;
	align-items: center;
	margin: var(--small-margin) 0;
}

.sample {
	background: var(--light-grey);
	padding: 0.5rem;
}

.chars {
	display: block;
	position: relative;
	font-family: var(--font-stack);
	font-size: var(--preview-font-size, 2rem);
}

.feature-message {
	font-feature-settings: normal !important;
	font-family: var(--system-font-stack);
	font-style: italic;
	color: var(--unlighterer-grey);
	margin: 1rem 0;
	overflow: hidden;
}

.max-message {
	font-feature-settings: normal !important;
	font-family: var(--system-font-stack);
	font-style: italic;
	color: var(--unlighterer-grey);
	overflow: hidden;
	text-align: right;
}

.code {
	position: relative;
}

.plus {
	padding: 0 0.6em 0 0.25em;
}
</style>
