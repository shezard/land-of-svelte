import { derived, writable } from 'svelte/store';
import { hasQuestFlag } from './quest';
import type { Npc } from '..';

interface Dialog {
    title: string;
    content: string[];
    dialogChoices: number[];
}

export interface DialogChoice {
    content: string[];
    predicate: () => boolean;
    doAction?: () => void;
    dialogChoices?: number[];
}

const minerDialog: Dialog = {
    title: 'TO REMOVE',
    content: ["You've seen Ned ?"],
    dialogChoices: [2, 3]
};

const testDialog2: DialogChoice = {
    content: ['Yes'],
    predicate: () => hasQuestFlag('ned', 'found')
};

const testDialog3: DialogChoice = {
    content: ['No'],
    predicate: () => true,
    dialogChoices: [4]
};

const testDialog4: DialogChoice = {
    content: ['Come see me if you found him !'],
    predicate: () => true,
    doAction: () => {
        console.log('ok');
        // close dialog
    }
};

const dialogs: Record<number, Dialog | DialogChoice> = {
    1: minerDialog,
    2: testDialog2,
    3: testDialog3,
    4: testDialog4
};

export const getDialogChoice = (dialogChoiceId: number): DialogChoice => {
    return dialogs[dialogChoiceId] as DialogChoice;
};

export const npc = writable<Npc>();

export const dialog = derived(npc, function (npc: Npc): Dialog {
    const dialogsFromChain = npc.dialogs.map((dialogId) => {
        return dialogs[dialogId];
    });

    const lastDialog = dialogsFromChain[dialogsFromChain.length - 1] as DialogChoice;

    return {
        title: npc.name,
        content: dialogsFromChain.map((dialog) => dialog.content).flat(),
        dialogChoices: lastDialog.dialogChoices ?? []
    };
});
