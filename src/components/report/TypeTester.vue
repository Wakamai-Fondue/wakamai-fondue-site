<template>
	<section id="tester">
		<h2 class="section-title">Tester</h2>
		<div class="content tester-container">
			<div
				class="tester"
				:class="{ sticky }"
				:style="
					$filters.inlinestyle(
						`${variableStyles}${featureStyles}${textStyles}`
					)
				"
				:lang="language"
			>
				<button
					contenteditable="false"
					type="button"
					alt="Pin text"
					class="sticky-button"
					:class="{ sticky }"
					@click="sticky = !sticky"
				>
					📌
				</button>
				<p
					spellcheck="false"
					dir="auto"
					contenteditable
					v-if="customText"
				>
					{{ customText }}
				</p>
				<p spellcheck="false" dir="auto" contenteditable v-else>
					Brillat Savarin’s Fondue (an excellent recipe)
					<br />
					<br />
					Ingredients: eggs, cheese, butter, pepper and salt. Take the
					same number of eggs as there are guests; weigh the eggs in
					the shell, allow a third of their weight in Gruyère cheese,
					and a piece of butter one-sixth of the weight of the cheese.
					Break the eggs into a basin, beat them well; add the cheese,
					which should be grated, and the butter, which should be
					broken in small pieces. Stir these ingredients together with
					a wooden spoon; put the mixture into a lined saucepan, place
					it over the fire, and stir until the substance is thick and
					soft. Put in a little salt, according to the age of the
					cheese, and a good sprinkling of pepper, and serve the
					fondue on a very hot silver or metal plate. Do not allow the
					fondue to remain on the fire after the mixture is set, as,
					if it boils, it will be entirely spoilt. 0123456789
					!@#$%^&*(),.?
				</p>
			</div>

			<TextControls
				:font="font"
				@updateTextStyles="updateTextStyles"
				@updateLanguage="updateLanguage"
			/>
			<FeatureControls
				:font="font"
				:showTitles="false"
				@updateFeatureStyles="updateFeatureStyles"
			/>
			<VariableControls
				v-if="font.isVariable"
				:font="font"
				:showAxes="true"
				:showTitles="false"
				showInstances="dropdown"
				@updateVariableStyles="updateVariableStyles"
			/>
			<div class="code">
				<Prism language="html" v-if="hasLocalization">{{ html }}</Prism>
				<div class="code-styles">
					<CopyToClipboard :content="styles" />
					<Prism language="css">{{ styles }}</Prism>
				</div>
			</div>
		</div>
	</section>
</template>

<script src="./TypeTester.js"></script>
<style src="./TypeTester.css" scoped></style>
