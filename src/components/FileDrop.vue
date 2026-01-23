<template>
	<div class="filedrop">
		<label class="upload">
			<div class="background circle-background"></div>
			<input
				type="file"
				name="file"
				accept=".woff,.woff2,.ttf,.otf"
				@change="$emit('getFont', $event)"
			/>
			<div class="info">
				<strong>Drop a font!</strong>
				<button
					type="button"
					class="button on"
					@click="$emit('getExampleFont', 'GimletVariable-VF.woff2')"
				>
					Try with Gimlet
				</button>
				<span class="errormessage" :class="{ show: error }">
					<strong>Oops! I couldn't handle that file.</strong>
					<a href="mailto:brokenfonts@pixelambacht.nl"
						>Tell me about it so I can fix it</a
					>
				</span>
			</div>
		</label>
	</div>
</template>

<script>
export default {
	props: ["error"],
	emits: ["getFont", "getExampleFont"],
};
</script>

<style scoped>
.filedrop {
	position: relative;
	z-index: 10; /* Must be above all other elements */
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background 150ms;
}

.working .filedrop {
	pointer-events: none;
}

.background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	animation: weeee 20s linear infinite reverse;
}

.working .background {
	animation-duration: 1s;
	animation-direction: normal;
}

.upload {
	position: relative;
	width: 50vmin;
	height: 50vmin;
	max-width: 500px;
	max-height: 500px;
	transition: transform 150ms;
	cursor: pointer;
}

.upload::after {
	content: "";
	background: url("@/assets/logo.svg");
	position: absolute;
	top: -16%;
	left: -16%;
	width: 132%;
	height: 132%;
	animation: weeee var(--duration, 38s) linear infinite
		var(--direction, normal);
}

.working .upload::after {
	--duration: 1s;
	--direction: reverse;
}

.upload input {
	position: absolute;
	width: 0;
	height: 0;
	opacity: 0;
}

.info {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding-top: 5rem;
	color: black;
}

.working .info {
	opacity: 0.25;
}

.info > strong {
	font-size: 1.5em;
}

.info button {
	margin-top: 1.5rem;
	/* Stacking tricks to prevent button click
    from being seen as label click */
	position: relative;
	z-index: 1;
}

.dragging .filedrop {
	position: fixed;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(7.5px);
}

.dragging .upload {
	transform: scale(1.1);
}

.errormessage {
	pointer-events: none;
	margin-top: 1.25rem;
	color: var(--red);
	opacity: 0;
	text-align: center;
	position: relative;
	z-index: 1;
}

.errormessage strong {
	display: block;
	margin-bottom: 0.25em;
}

.errormessage.show {
	pointer-events: auto;
	opacity: 1;
}

@keyframes weeee {
	to {
		transform: rotate(-1turn);
	}
}
</style>
