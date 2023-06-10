<script lang="ts">
	import { keyboard } from '$stores/keyboard';
</script>

<div class="text-3xl text-white">Controls</div>

<div class="flex flex-col text-white">
	<label class="flex">
		<span class="grow text-2xl"> Forward </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.forward}
		/>
	</label>
	<label class="flex">
		<span class="grow text-2xl"> Strafe left </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.left}
		/>
	</label>
	<label class="flex">
		<span class="grow text-2xl"> Backward </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.backward}
		/>
	</label>
	<label class="flex">
		<span class="grow text-2xl"> Strafe right </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.right}
		/>
	</label>
	<label class="flex">
		<span class="grow text-2xl"> Rotate left </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.rotateLeft}
		/>
	</label>
	<label class="flex">
		<span class="grow text-2xl"> Rotate right </span>
		<input
			class="border border-black w-5 indent-[5px] text-black"
			pattern="[a-z]"
			maxlength="1"
			bind:value={$keyboard.rotateRight}
		/>
	</label>
</div>

<style>
	span::before {
		content: ' ';
		display: inline-block;
		width: 2rem;
	}
</style>
