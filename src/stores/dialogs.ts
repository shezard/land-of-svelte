import { writable } from 'svelte/store';

interface Dialog {
    title: string;
    content: string;
    dialogChoices: DialogChoice[];
}

interface DialogChoice {
    content: string;
    doAction?: () => void;
}

const testDialog: Dialog = {
    title: 'NPC Name ?',
    content: 'Welcome adventurer, blabla',
    dialogChoices: []
};

const testDialog2: Dialog = {
    title: 'NPC Name ?',
    content: 'Welcome adventurer, blabla',
    dialogChoices: [
        {
            content: 'proceed',
            doAction: () => {
                console.log('ok');
                // to next step
            }
        },
        {
            content: 'wait',
            doAction: () => {
                console.log('ok');
                // close dialog
            }
        }
    ]
};

const level0Dialogs: Dialog[] = [];
const level1Dialogs: Dialog[] = [];

export const dialogs = writable<Dialog[][]>([level0Dialogs, level1Dialogs]);
