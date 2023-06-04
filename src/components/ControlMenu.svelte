<script lang="ts">
	import { keyboard } from '$lib/keyboard';
</script>

<div class="container grid justify-items-center items-center h-screen">
	<div class="cursor-default">
		<div class="text-2xl">Controls</div>

		<div class="flex flex-col">
			<label class="flex">
				<span class="grow"> Forward </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.forward}
				/>
			</label>
			<label class="flex">
				<span class="grow"> Strafe left </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.left}
				/>
			</label>
			<label class="flex">
				<span class="grow"> Backward </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.backward}
				/>
			</label>
			<label class="flex">
				<span class="grow"> Strafe right </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.right}
				/>
			</label>
			<label class="flex">
				<span class="grow"> Rotate left </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.rotateLeft}
				/>
			</label>
			<label class="flex">
				<span class="grow"> Rotate right </span>
				<input
					class="border border-black w-5 indent-[5px]"
					pattern="[a-z]"
					maxlength="1"
					bind:value={$keyboard.rotateRight}
				/>
			</label>
		</div>
	</div>
</div>
