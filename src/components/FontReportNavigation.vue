<template>
	<div class="font-report-navigation">
		<nav>
			<a href="#app" class="new">New</a>
			<a href="#summary">Summary</a>
			<a href="#tester">Tester</a>
			<a href="#variable">Variable</a>
			<a href="#features">Features</a>
			<a href="#charset">Characters</a>
			<a href="#stylesheet" class="css">CSS</a>
		</nav>
		<FontSizeSlider />
	</div>
</template>

<script>
import FontSizeSlider from "./FontSizeSlider.vue";

export default {
	components: {
		FontSizeSlider,
	},
};
</script>

<style scoped>
.font-report-navigation {
	background: var(--yellow);
	padding: 0 1em;
	min-height: var(--nav-height);
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25rem;
}

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0 1em;
	margin-right: 2em;
}

nav a {
	text-decoration: none;
}

.new {
	color: var(--green);
}

.css {
	color: var(--red);
}
</style>
