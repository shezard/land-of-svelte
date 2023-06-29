<script lang="ts">
    import { dialog, dialogChain, type DialogChoice } from "$stores/dialogs";

    const doAction = (dialogChoice: DialogChoice) => () =>  {
        dialogChain.update((dialogChain) => {
            return [...dialogChain, dialogChoice.id];
        })
        dialogChoice.doAction?.();
    }

</script>

<div class="menu text-white text-2xl">
	<div class="grid grid-cols-1">
		<div class="flex flex-col items-center">
			<div class="text-3xl">
                {$dialog.title}
            </div>
            <div class=" mt-2 mb-2">
                {#each $dialog.content as content}
                    {content}
                {/each}
            </div>
            {#each $dialog.dialogChoices as dialogChoice}
                <div
                    class="action cursor-pointer"
                    on:click={doAction(dialogChoice)}
                    on:keypress={() => {
                        // no-op
                    }}
                >
                    {dialogChoice.content}
                </div>
            {/each}
		</div>
	</div>
</div>
