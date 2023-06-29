import { derived, writable } from 'svelte/store';

interface Dialog {
    title: string;
    content: string[];
    dialogChoices: number[];
}

export interface DialogChoice {
    content: string[];
    doAction?: () => void;
    dialogChoices?: number[];
}

const testDialog1: Dialog = {
    title: 'NPC Name ?',
    content: ['Welcome adventurer, blabla'],
    dialogChoices: [2, 3]
};

const testDialog2: DialogChoice = {
    content: ['proceed'],
    doAction: () => {
        console.log('ok');
        // to next step
    },
    dialogChoices: [4]
}

const testDialog3: DialogChoice =
{
    content: ['wait'],
    doAction: () => {
        console.log('ok');
        // close dialog
    }
}

const testDialog4: DialogChoice = {
    content: ['foo']
};


export const dialogs: Record<number, Dialog|DialogChoice> = {
    1: testDialog1,
    2: testDialog2,
    3: testDialog3,
    4: testDialog4
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
        dialogChoices: lastDialog.dialogChoices ?? [],
    };
});
