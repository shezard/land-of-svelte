<script lang="ts">
    import { getDialogChoice, dialog, npc, getNextStep } from "$stores/dialogs";
    import type { PlayerDialog} from '$lib/dialogs';
    import { player } from "$stores/player";
    import { get } from "svelte/store";

    const doAction = (playerDialog: PlayerDialog, dialogChoiceRef: string) => () =>  {

        let isSuccess = false;

        if(playerDialog.test) {
            isSuccess = get(player).testStats(playerDialog.test);
        }

        playerDialog.doAction?.();

        npc.update((npc) => {
            npc.dialogs = [...npc.dialogs, dialogChoiceRef];
            if(playerDialog.nextStep) {
                npc.dialogs.push(playerDialog.nextStep);
                getNextStep(playerDialog.nextStep).doAction?.();
            }

            if(playerDialog.successStep && isSuccess) {
                npc.dialogs.push(playerDialog.successStep);
                getNextStep(playerDialog.successStep).doAction?.();
            }


            if(playerDialog.failureStep && !isSuccess) {
                npc.dialogs.push(playerDialog.failureStep);
                getNextStep(playerDialog.failureStep).doAction?.();
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
            {#each $dialog.dialogChoices as dialogChoiceRef}
                {#if getDialogChoice(dialogChoiceRef).predicate()}
                    <div
                        class="action cursor-pointer"
                        on:click={doAction(getDialogChoice(dialogChoiceRef), dialogChoiceRef)}
                        on:keypress={() => {
                            // no-op
                        }}
                    >
                        {getDialogChoice(dialogChoiceRef).content}
                    </div>
                {/if}
            {/each}
		</div>
	</div>
</div>

<style>
    .npc {

    }

    .player {

    }
</style>
