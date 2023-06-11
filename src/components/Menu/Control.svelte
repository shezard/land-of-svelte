<script lang="ts">
	import { keyboard } from '$stores/keyboard';
</script>

<div class="text-3xl text-white">Controls</div>

<div class="grid grid-cols-2">
	<div class="flex flex-col text-white">
		<label class="flex">
			<span class="label"> Forward </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.forward} />
		</label>
		<label class="flex">
			<span class="label"> Strafe left </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.left} />
		</label>
		<label class="flex">
			<span class="label"> Backward </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.backward} />
		</label>
		<label class="flex">
			<span class="label"> Strafe right </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.right} />
		</label>

		<div class="p-5" />

		<label class="flex">
			<span class="label"> Rotate left </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.rotateLeft} />
		</label>
		<label class="flex">
			<span class="label"> Rotate right </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.rotateRight} />
		</label>
	</div>

	<div class="flex flex-col text-white">
		<label class="flex">
			<span class="label"> Inventory </span>
			<input class="input" pattern="[a-z]" maxlength="1" bind:value={$keyboard.inventory} />
		</label>
	</div>
</div>

<style>
	.label {
		@apply grow text-2xl mr-5;
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
