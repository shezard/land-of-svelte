<script lang="ts">
	import { keyboard } from '$stores/keyboard';
</script>

<div class="text-3xl text-white">Controls</div>

<div class="grid grid-cols-2">
	<div class="flex flex-col text-white">
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.forward} />
			<span class="label"> Forward </span>
		</label>
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.left} />
			<span class="label"> Strafe left </span>
		</label>
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.backward} />
			<span class="label"> Backward </span>
		</label>
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.right} />
			<span class="label"> Strafe right </span>
		</label>

		<div class="p-5" />

		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.rotateLeft} />
			<span class="label"> Rotate left </span>
		</label>
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.rotateRight} />
			<span class="label"> Rotate right </span>
		</label>
	</div>

	<div class="flex flex-col text-white">
		<label class="flex">
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.inventory} />
			<span class="label"> Inventory </span>
		</label>
	</div>
</div>

<style>
	.label {
		@apply text-2xl;
	}

	.label::before {
		content: ' ';
		display: inline-block;
		width: 2rem;
	}

	.input {
		@apply border border-black w-5 indent-[5px] text-black;
	}
</style>
