<script lang="ts">
    import { getDialogChoice, dialog, dialogChain, type DialogChoice } from "$stores/dialogs";

    const doAction = (dialogChoice: DialogChoice, dialogChoiceId: number) => () =>  {
        dialogChain.update((dialogChain) => {
            return [...dialogChain, dialogChoiceId];
        })
        dialogChoice.doAction?.();
    }

</script>

<div class="menu text-white text-2xl">
	<div class="grid grid-cols-1">
		<div class="flex flex-col">
			<div class="text-3xl">
                {$dialog.title}
            </div>
            <div class=" mt-2 mb-2 grid">
                {#each $dialog.content as content}
                    <div class="">
                        {content}
                    </div>
                {/each}
            </div>
            {#each $dialog.dialogChoices as dialogChoiceId}
                {#if getDialogChoice(dialogChoiceId).predicate()}
                    <div
                        class="action cursor-pointer"
                        on:click={doAction(getDialogChoice(dialogChoiceId), dialogChoiceId)}
                        on:keypress={() => {
                            // no-op
                        }}
                    >
                        {getDialogChoice(dialogChoiceId).content}
                    </div>
                {/if}
            {/each}
		</div>
	</div>
</div>
