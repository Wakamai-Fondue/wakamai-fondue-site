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
		<PreviewFontSizeControl />
	</div>
</template>

<script>
import PreviewFontSizeControl from "./PreviewFontSizeControl.vue";

export default {
	components: {
		PreviewFontSizeControl,
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
	display: grid;
	grid-template-columns: 1fr auto;
	font-size: 1.25rem;
}

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0 1em;
	align-items: center;
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
