<template>
	<div class="font-report-navigation-container">
		<div class="font-report-navigation">
			<nav>
				<a href="#app" class="new">New</a>
				<a href="#summary">Summary</a>
				<a href="#tester">Tester</a>
				<a href="#color">Color</a>
				<a href="#variable">Variable</a>
				<a href="#features">Features</a>
				<a href="#charset">Characters</a>
				<a href="#stylesheet" class="css">CSS</a>
			</nav>
			<FontSizeSlider />
		</div>
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
.font-report-navigation-container {
	position: sticky;
	top: 0;
	z-index: 1;
	background: var(--yellow);
}

.font-report-navigation {
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	margin: 0 auto;
	max-width: var(--max-content-width);
	padding: 0 1em;
	min-height: var(--nav-height);
}

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0 1em;
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

/* Hide links to bits we're not showing */
body:not(:has(#color)) [href="#color"],
body:not(:has(#variable)) [href="#variable"],
body:not(:has(#features)) [href="#features"] {
	display: none;
}

@media screen and (max-width: 820px) {
	.font-report-navigation {
		--nav-height: auto;
		padding: 0.25rem 0;
		grid-template-columns: 1fr;
		gap: 0.25rem 0;
		place-items: center;
	}

	nav {
		justify-content: center;
	}
}
</style>
