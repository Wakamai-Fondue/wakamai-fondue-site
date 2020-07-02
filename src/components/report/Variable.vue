<template>
	<section class="variable" id="veriable">
		<h2 class="section-title">Variable</h2>
		<div class="content">
			<div contenteditable class="variable-tester" :style="axesStyle">
				The five boxing wizards jump quickly
			</div>
			<Sliders
				:font="font"
				:showAxes="true"
				:showInstances="true"
				:showTitles="true"
				@updateAxes="updateAxes"
			/>
		</div>
	</section>
</template>

<script src="./Variable.js"></script>
<style src="./Variable.css" scoped></style>
