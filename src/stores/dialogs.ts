import { derived, writable } from 'svelte/store';
import type { Npc } from '..';
import { dialogs, type NpcDialog, type PlayerDialog } from '$lib/dialogs';

interface Dialog {
    title: string;
    dialogs: (NpcDialog | PlayerDialog)[];
    dialogChoices: string[];
}

export const getDialogChoice = (dialogChoiceRef: string): PlayerDialog => {
    return dialogs[dialogChoiceRef] as PlayerDialog;
};

export const getNextStep = (nextStepRef: string): NpcDialog => {
    return dialogs[nextStepRef] as NpcDialog;
};

export const npc = writable<Npc>();

export const dialog = derived(npc, function (npc: Npc): Dialog {
    const dialogsFromChain = npc.dialogs.map((dialogRef) => {
        return dialogs[dialogRef];
    });

    const lastDialog = dialogsFromChain[dialogsFromChain.length - 1] as NpcDialog;

    return {
        title: npc.name,
        dialogs: dialogsFromChain,
        dialogChoices: lastDialog.dialogChoices
    };
});
