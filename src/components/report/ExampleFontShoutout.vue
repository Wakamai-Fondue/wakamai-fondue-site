<template>
	<div class="example-font-shoutout">
		<a href="https://polymodesans.com/" target="_blank">
			<strong>Polymode</strong>
		</a>
		by
		<a href="https://xyztype.com" target="_blank">XYZ Type</a>
		is today's Wakamai Fondue demo font!
		<br />
		<a href="https://xyztype.com/fonts" target="_blank" class="button on"
			>Get it here!</a
		>
	</div>
</template>

<style scoped>
.example-font-shoutout {
	position: relative;
	font-size: 1.25rem;
	margin-top: 8rem;
	padding: 2rem;
	text-align: center;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 20'%3E%3Cpath fill='%23dfd6b3' d='M99.72 2.89c-.1-.86-.25-1.82-.9-2.34-.5-.41-1.18-.45-1.81-.47-4.2-.12-8.95.44-13.16.44C57.56.56 32.52.08 6.28.08 4.4.07 1.28-.29.42.62c-.45.48-.44 1.25-.4 1.92.27 4.33-.13 9.25.14 13.58.04.57.02 1.78.08 2.34.1.89.36 1.46 1.19 1.48 12.39.27 25.42-.32 37.81-.05 6.44.14 14.11-.34 20.86-.25 12.48.17 23.14.3 37.03.3.71 0 1.47-.22 1.93-.8.39-.49.45-1.17.49-1.81.31-5.15.74-9.32.17-14.44z'/%3E%3C/svg%3E");
	background-size: 100% 100%;
}

.example-font-shoutout::after {
	content: "";
	position: absolute;
	z-index: -1;
	inset: -0.3rem;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 20'%3E%3Cpath fill='%23cd4e49' d='M99.72 2.89c-.1-.86-.25-1.82-.9-2.34-.5-.41-1.18-.45-1.81-.47-4.2-.12-8.95.44-13.16.44C57.56.56 32.52.08 6.28.08 4.4.07 1.28-.29.42.62c-.45.48-.44 1.25-.4 1.92.27 4.33-.13 9.25.14 13.58.04.57.02 1.78.08 2.34.1.89.36 1.46 1.19 1.48 12.39.27 25.42-.32 37.81-.05 6.44.14 14.11-.34 20.86-.25 12.48.17 23.14.3 37.03.3.71 0 1.47-.22 1.93-.8.39-.49.45-1.17.49-1.81.31-5.15.74-9.32.17-14.44z'/%3E%3C/svg%3E");
	background-size: 100% 100%;
	rotate: 180deg;
	animation: waaaa 3s ease-in-out alternate infinite;
}

.example-font-shoutout::before {
	content: "";
	position: absolute;
	z-index: -1;
	inset: -0.6rem;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 20'%3E%3Cpath fill='%235f8e5d' d='M99.72 2.89c-.1-.86-.25-1.82-.9-2.34-.5-.41-1.18-.45-1.81-.47-4.2-.12-8.95.44-13.16.44C57.56.56 32.52.08 6.28.08 4.4.07 1.28-.29.42.62c-.45.48-.44 1.25-.4 1.92.27 4.33-.13 9.25.14 13.58.04.57.02 1.78.08 2.34.1.89.36 1.46 1.19 1.48 12.39.27 25.42-.32 37.81-.05 6.44.14 14.11-.34 20.86-.25 12.48.17 23.14.3 37.03.3.71 0 1.47-.22 1.93-.8.39-.49.45-1.17.49-1.81.31-5.15.74-9.32.17-14.44z'/%3E%3C/svg%3E");
	background-size: 100% 100%;
	rotate: 180deg;
	animation: waaaa 2.5s -1s ease-in-out alternate infinite;
}

@keyframes waaaa {
	from {
		transform: scale(1, 1);
	}
	to {
		transform: scale(1.01, 1.1);
	}
}

.example-font-shoutout a:not(.button) {
	color: var(--red);
}

.example-font-shoutout a.button {
	display: inline-block;
	margin-top: 0.5em;
	text-decoration: none;
	font-size: 0.9em;
}
</style>
