<script lang="ts">
    import { getDialogChoice, dialog, npc, getNextStep } from "$stores/dialogs";
    import type {PlayerDialog} from '$lib/dialogs';

    const doAction = (playerDialog: PlayerDialog, dialogChoiceId: number) => () =>  {
        playerDialog.doAction?.();
        npc.update((npc) => {
            npc.dialogs = [...npc.dialogs, dialogChoiceId];
            if(playerDialog.nextStep) {
                npc.dialogs.push(playerDialog.nextStep);
                getNextStep(playerDialog.nextStep).doAction?.();
            }
            return npc;
        })
    }

</script>

<div class="menu text-white text-2xl">
	<div class="grid grid-cols-1">
		<div class="flex flex-col">
			<div class="text-3xl mb-5">
                {$dialog.title}
            </div>
            <div class=" mt-2 mb-2 grid">
                {#each $dialog.dialogs as dialogs}
                    <div class="{dialogs.type} mb-2">
                        <span style="opacity: 0.5">
                            {#if dialogs.type === 'player'}
                                You -
                            {:else}
                                {$dialog.title} -
                            {/if}
                        </span>
                        {dialogs.content}
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
