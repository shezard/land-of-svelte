import { derived, writable } from 'svelte/store';
import { hasQuestFlag } from './quest';
import type { Npc } from '..';

interface Dialog {
    title: string;
    dialogs: (NpcDialog | PlayerDialog)[];
    dialogChoices: number[];
}

export interface BaseDialog {
    content: string;
    predicate: () => boolean;
}

export type NpcDialog = BaseDialog & {
    type: 'npc';
    dialogChoices: number[];
};

export type PlayerDialog = BaseDialog & {
    type: 'player';
    nextStep?: number;
    doAction?: () => void;
};

const minerDialog: NpcDialog = {
    type: 'npc',
    content: "You've seen Ned ?",
    predicate: () => true,
    dialogChoices: [2, 3]
};

const testDialog2: PlayerDialog = {
    type: 'player',
    content: 'Yes',
    predicate: () => hasQuestFlag('ned', 'found')
};

const testDialog3: PlayerDialog = {
    type: 'player',
    content: 'No',
    predicate: () => true,
    nextStep: 4
};

const testDialog4: NpcDialog = {
    type: 'npc',
    content: 'Come see me if you found him !',
    predicate: () => true,
    dialogChoices: []
};

const dialogs: Record<number, NpcDialog | PlayerDialog> = {
    1: minerDialog,
    2: testDialog2,
    3: testDialog3,
    4: testDialog4
};

export const getDialogChoice = (dialogChoiceId: number): PlayerDialog => {
    return dialogs[dialogChoiceId] as PlayerDialog;
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
