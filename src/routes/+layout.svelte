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

	:global(.menu) {
		position: relative;
		width: 60vw;
		height: 40vh;
	}

	* {
		font-family: 'Alagard', sans-serif;
		text-shadow: 1px 1px 1px black;
		user-select: none;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(10px);
		}
		50% {
			transform: translateX(-10px);
		}
		75% {
			transform: translateX(10px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
