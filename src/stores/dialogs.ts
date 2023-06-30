import { derived, writable } from 'svelte/store';
import { hasQuestFlag } from './quest';

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
    title: 'Ted the miner',
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

export const dialogChain = writable<number[]>();

export const dialog = derived(dialogChain, function (dialogChain: number[]): Dialog {
    const dialogsFromChain = dialogChain.map((dialogId) => {
        return dialogs[dialogId];
    });

    const firstDialog = dialogsFromChain[0] as Dialog;
    const lastDialog = dialogsFromChain[dialogsFromChain.length - 1] as DialogChoice;

    return {
        title: firstDialog.title,
        content: dialogsFromChain.map((dialog) => dialog.content).flat(),
        dialogChoices: lastDialog.dialogChoices ?? []
    };
});
