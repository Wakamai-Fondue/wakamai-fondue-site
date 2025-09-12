<template>
	<section class="charset" id="charset">
		<h2 class="section-title">Character Set</h2>
		<div class="content" :class="{ 'show-features': showFeatures }">
			<div class="char-bar">
				<span>{{ font.charCount }} characters</span>
				<label>
					<input
						type="checkbox"
						name="toggle-categories"
						checked
						@change="toggleCategories()"
					/>Categories
				</label>

				<label v-if="font.isVariable && hasAxes">
					<input
						type="checkbox"
						name="toggle-axes"
						checked
						@change="toggleAxes()"
					/>Variable axes
				</label>
				<!--
				<label>
					<input
						type="checkbox"
						name="toggle-features"
						checked
						@change="toggleFeatures()"
					/>Layout features
				</label>
				-->
			</div>
			<VariableControls
				v-if="showAxes"
				:font="font"
				:showAxes="true"
				:showTitles="false"
				@updateVariableStyles="updateVariableStyles"
				class="char-sliders"
			/>

			<template v-if="showCategories">
				<div v-for="(cat, index) in catChars" :key="`cat${index}`">
					<h3>
						{{ cat.category }}
						<template v-if="cat.subCategory || cat.script">
							—
							{{ cat.subCategory }}
							{{ $filters.capitalize(cat.script) }}
						</template>
					</h3>

					<ol
						class="grid"
						:style="$filters.inlinestyle(variableStyles)"
					>
						<!-- Put this back → :class="char.feature ? 'feature' : 'code'" -->
						<li
							v-for="char in cat.chars"
							:key="`${char}`"
							class="code"
						>
							<span class="char" v-html="entitify(char)"></span>
							<span class="label" v-if="!char.feature">{{
								char
							}}</span>
							<!--
						<span class="label" v-if="char.feature">{{
							char.feature
						}}</span>
						-->
						</li>
					</ol>
				</div>
			</template>

			<ol
				class="grid"
				:style="$filters.inlinestyle(variableStyles)"
				v-if="!showCategories"
			>
				<!-- Put this back → :class="char.feature ? 'feature' : 'code'" -->
				<li v-for="char in chars" :key="`${char}`" class="code">
					<span class="char" v-html="entitify(char)"></span>
					<span class="label" v-if="!char.feature">{{ char }}</span>
					<!--
					<span class="label" v-if="char.feature">{{
						char.feature
					}}</span>
					-->
				</li>
			</ol>
		</div>
	</section>
</template>

<script>
import VariableControls from "./VariableControls.vue";

export default {
	props: ["font"],
	components: {
		VariableControls,
	},
	data() {
		return {
			variableStyles: "",
			showCategories: true,
			chars: this.font.supportedCharacters,
			catChars: this.font.categorisedCharacters,
			hasAxes: this.font.variable && this.font.variable.axes.length,
			showAxes: this.font.isVariable,
			hasFeatures: false, // TODO: Should be determined by the font
			showFeatures: false, // TODO: Should be determined by the font
		};
	},
	methods: {
		entitify: function (code) {
			return `&#x${code};`;
		},
		toggleCategories: function () {
			this.showCategories = !this.showCategories;
		},
		toggleAxes: function () {
			this.variableStyles = "";
			this.showAxes = !this.showAxes;
		},
		// toggleFeatures: function() {
		// 	this.showFeatures = !this.showFeatures;
		// },
		updateVariableStyles: function (updatedStyles) {
			this.variableStyles = updatedStyles;
		},
	},
};
</script>

<style scoped>
.char-bar {
	background: var(--light-grey);
	padding: 1em;
	margin-bottom: var(--small-margin);
	display: flex;
	align-items: center;
}

.char-bar span {
	margin-right: auto;
}

.char-bar label {
	margin-left: 1rem;
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
	grid-gap: var(--small-margin);
}

.code,
.feature {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.75rem 0 0.25rem 0;
}

.code {
	background: var(--light-grey);
}

.feature {
	background: var(--unlight-grey);
	display: none;
}

.show-features .feature {
	display: flex;
}

.char {
	font-family: var(--font-stack);
	font-size: 2rem;
	flex: auto;
}

.label {
	flex: none;
	font-size: 0.75rem;
	margin-top: 0.5rem;
}

.code .label {
	text-transform: uppercase;
	color: var(--unlighterer-grey);
}

.feature .label {
	background: var(--unlighter-grey);
	color: var(--light-grey);
	padding: 0 0.5em;
	border-radius: 0.25em;
}

.char-sliders {
	background: var(--light-grey);
	border-bottom: var(--small-margin) solid white;
	padding: 1em;
	margin-bottom: var(--small-margin);
	position: sticky;
	top: 0;
}
</style>
