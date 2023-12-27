<template>
	<section class="variable" id="variable">
		<h2 class="section-title">Variable</h2>
		<div class="content variable-tester-container">
			<div class="variable-tester" :class="{ sticky }">
				<p
					spellcheck="false"
					contenteditable
					:style="variableStyles | inlinestyle"
				>
					The melting cheese & bread explode in a quick wave of joy:
					“1, 2, 3… zen!”
				</p>
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
			</div>
			<VariableControls
				:font="font"
				:showAxes="true"
				:showTitles="false"
				:showStyles="true"
				showInstances="list"
				@updateVariableStyles="updateVariableStyles"
			/>
		</div>
	</section>
</template>

<script src="./VariableFont.js"></script>
<style src="./VariableFont.css" scoped></style>
