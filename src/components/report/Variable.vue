<template>
	<section class="variable" id="variable">
		<h2 class="section-title">Variable</h2>
		<div class="content">
			<div contenteditable class="variable-tester" :style="variableStyles">
				The melting cheese & bread explode in a quick wave of joy: “1,
				2, 3… zen!”
				<!-- Pangram by Amelia Bellamy-Royds -->
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

<script src="./Variable.js"></script>
<style src="./Variable.css" scoped></style>
