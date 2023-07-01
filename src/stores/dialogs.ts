import { derived, writable } from 'svelte/store';
import type { Npc } from '..';
import { dialogs, type NpcDialog, type PlayerDialog } from '$lib/dialogs';

interface Dialog {
    title: string;
    dialogs: (NpcDialog | PlayerDialog)[];
    dialogChoices: number[];
}

export const getDialogChoice = (dialogChoiceId: number): PlayerDialog => {
    return dialogs[dialogChoiceId] as PlayerDialog;
};

export const getNextStep = (nextStepId: number): NpcDialog => {
    return dialogs[nextStepId] as NpcDialog;
};

export const npc = writable<Npc>();

export const dialog = derived(npc, function (npc: Npc): Dialog {
    const dialogsFromChain = npc.dialogs.map((dialogId) => {
        return dialogs[dialogId];
    });

    const lastDialog = dialogsFromChain[dialogsFromChain.length - 1] as NpcDialog;

    return {
        title: npc.name,
        dialogs: dialogsFromChain,
        dialogChoices: lastDialog.dialogChoices
    };
});
