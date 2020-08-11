<template>
	<section class="variable" id="veriable" v-if="axes">
		<h2 class="section-title">Variable</h2>
		<div class="content">
			<div contenteditable class="variable-tester" :style="axesStyle">
				The melting cheese & bread explode in a quick wave of joy: “1,
				2, 3… zen!”
				<!-- Pangram by Amelia Bellamy-Royds -->
			</div>
			<VariableControls
				:font="font"
				:showAxes="true"
				:showTitles="true"
				showInstances="list"
				@updateAxes="updateAxes"
			/>
		</div>
	</section>
</template>

<script src="./Variable.js"></script>
<style src="./Variable.css" scoped></style>
