<template>
	<section id="tester">
		<h2 class="section-title">Tester</h2>
		<div class="tester-wrapper">
			<div
				class="tester"
				spellcheck="false"
				dir="auto"
				contenteditable
				:style="`${variableStyles}${featureStyles}${textStyles}`"
			>
				<p v-if="customText">
					{{ customText }}
				</p>
				<template v-else>
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
					if it boils, it will be entirely spoilt.
					<br />
					<br />
					0123456789 !@#$%^&*(),.?
				</template>
			</div>
		</div>
		<div class="content">
			<TextControls @updateTextStyles="updateTextStyles" />
			<FeatureControls
				:showTitles="false"
				@updateFeatureStyles="updateFeatureStyles"
			/>
			<VariableControls
				:font="font"
				:showAxes="true"
				:showTitles="false"
				showInstances="dropdown"
				@updateVariableStyles="updateVariableStyles"
			/>
		</div>
	</section>
</template>

<script src="./Tester.js"></script>
<sryle src="./Tester.css" scoped></sryle>
