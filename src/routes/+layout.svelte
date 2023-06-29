<script>
	import '../app.postcss';
</script>

<slot />

<style global>
	:global(html, body) {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	:global(body::after) {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
		z-index: -1;
		content: url(textures/sword-0.png);
	}

	:global(.menu) {
		position: relative;
		width: 60vw;
		height: 40vh;
	}

    :global(.action::before) {
		content: ' ';
		display: inline-block;
		width: 2rem;
	}

    :global(.action:hover::before) {
		content: '☞';
	}

	:global(html) {
		--border-color-dark: #542b29;
	}

	* {
		font-family: 'Alagard', sans-serif;
		text-shadow: 1px 1px 1px black;
		user-select: none;
	}

	@keyframes shake {
		0% {
			transform: translateX(-20px);
		}
		50% {
			transform: translateX(20px);
		}
		100% {
			transform: translateX(-20px);
		}
	}
</style>
