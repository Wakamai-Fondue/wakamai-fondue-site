<template>
	<section class="charset" id="charset">
		<h2 class="section-title">Character Set</h2>
		<div class="content" :class="{ 'show-features': showFeatures }">
			<div class="char-bar">
				<span>{{ charCount }} characters</span>
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
					<h3 class="title">
						{{ cat.category }}
						<template v-if="cat.subCategory || cat.script">
							—
							{{ cat.subCategory }}
							{{ cat.script | capitalize }}
						</template>
					</h3>

					<ol class="grid" :style="variableStyles | inlinestyle">
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
				:style="variableStyles | inlinestyle"
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

<script src="./CharGrid.js"></script>
<style src="./CharGrid.css" scoped></style>
