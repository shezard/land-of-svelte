<script lang="ts">
	import { keyboard, type Action } from '$stores/keyboard';

	const changeKey = (target: Action) => (e: KeyboardEvent) => {
		keyboard.update((keyboard) => {
			keyboard[target] = e.code;

			return keyboard;
		});
	};
</script>

<div class="text-3xl text-white">Controls</div>

<div class="grid grid-cols-2">
	<div class="flex flex-col text-white">
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('forward')}
				value={$keyboard.forward.substring(3, 4)}
			/>
			<span class="label"> Forward </span>
		</label>
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('left')}
				value={$keyboard.left.substring(3, 4)}
			/>
			<span class="label"> Strafe left </span>
		</label>
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('backward')}
				value={$keyboard.backward.substring(3, 4)}
			/>
			<span class="label"> Backward </span>
		</label>
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('right')}
				value={$keyboard.right.substring(3, 4)}
			/>
			<span class="label"> Strafe right </span>
		</label>

		<div class="p-5" />

		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('rotateLeft')}
				value={$keyboard.rotateLeft.substring(3, 4)}
			/>
			<span class="label"> Rotate left </span>
		</label>
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('rotateRight')}
				value={$keyboard.rotateRight.substring(3, 4)}
			/>
			<span class="label"> Rotate right </span>
		</label>
	</div>

	<div class="flex flex-col text-white">
		<label class="flex">
			<input
				class="input"
				pattern="[a-z]"
				maxlength="1"
				on:keypress={changeKey('inventory')}
				value={$keyboard.inventory.substring(3, 4)}
			/>
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
