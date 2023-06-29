import { derived, writable } from 'svelte/store';

interface Dialog {
    id: number;
    title: string;
    content: string;
    dialogChoices: DialogChoice[];
}

interface DialogChoice {
    id: number;
    content: string;
    doAction?: () => void;
    dialogChoices?: DialogChoice[];
}

const testDialog2: Dialog = {
    id: 1,
    title: 'NPC Name ?',
    content: 'Welcome adventurer, blabla',
    dialogChoices: [
        {
            id: 3,
            content: 'proceed',
            doAction: () => {
                console.log('ok');
                // to next step
            }
        },
        {
            id: 4,
            content: 'wait',
            doAction: () => {
                console.log('ok');
                // close dialog
            }
        }
    ]
};

const dialogs: Dialog[] = [testDialog2];

export const dialogChain = writable<number[]>();

export const dialog = derived(dialogChain, function (dialogChain: number[]): Dialog {
    const dialog = dialogs.find((dialog: Dialog) => {
        return dialog.id === dialogChain[0];
    });

    if (dialog === undefined) {
        throw new Error(`Dialog not found ${dialogChain[0]}`);
    }

    return dialog;
});
