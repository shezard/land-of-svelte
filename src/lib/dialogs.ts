import { hasQuestFlag, setQuestFlag } from '$stores/quest';
import { store } from '$stores/store';

import type { Doodad } from '..';

export interface BaseDialog {
    content: string;
    predicate: () => boolean;
    doAction?: () => void;
}

export type NpcDialog = BaseDialog & {
    type: 'npc';
    dialogChoices: string[];
};

export type PlayerDialog = BaseDialog & {
    type: 'player';
    test?: GraphTest;
    nextStep?: string;
    successStep?: string;
    failureStep?: string;
};

export interface GraphTest {
    strength?: number;
    dexterity?: number;
    wisdom?: number;
}

interface GraphDialog {
    content: string;
    test?: GraphTest;
    predicate?: () => boolean;
    doAction?: () => void;
    dialogChoices?: GraphDialog[] | string[];
    nextStep?: GraphDialog | string;
    successStep?: GraphDialog | string;
    failureStep?: GraphDialog | string;
    ref?: string;
}

const ted: GraphDialog = {
    content: "You've seen my brother Ned ?",
    dialogChoices: [
        {
            content: 'Yes',
            predicate: () => hasQuestFlag('ned', 'found'),
            nextStep: {
                ref: 'thank-you',
                content: "Thank you ! I've open a shortcut to your left !",
                doAction: () => {
                    store.update((store) => {
                        const ladder = store.levels[store.currentLevelNumber].getScript(
                            4
                        ) as Doodad;
                        ladder.z = 0;
                        store.levels[store.currentLevelNumber].replaceScript(ladder);
                        return store;
                    });
                }
            }
        },
        {
            content: 'No',
            nextStep: {
                content: 'Come see me if you found him !',
                dialogChoices: [
                    {
                        content: "I've found Ned !",
                        predicate: () => hasQuestFlag('ned', 'found'),
                        nextStep: 'thank-you'
                    }
                ]
            }
        }
    ]
};

const ned: GraphDialog = {
    content: "Hello, I'm Ned",
    dialogChoices: [
        {
            content: 'Your brother is looking for you !',
            doAction: () => {
                setQuestFlag('ned', 'found');
            },
            nextStep: {
                content: "Tell him I'm fine"
            }
        }
    ]
};

const lockedDoor: GraphDialog = {
    content: 'A locked door',
    dialogChoices: [
        {
            content: 'Try to pick the lock',
            test: {
                dexterity: 3
            },
            successStep: {
                content: 'The door opened',
                doAction: () => {
                    console.log('success');
                }
            },
            failureStep: {
                content: 'The door stays put',
                doAction: () => {
                    console.log('failure');
                }
            }
        }
    ]
};

const makeDialogs = (graph: GraphDialog, ref = ''): Record<string, NpcDialog | PlayerDialog> => {
    ref = graph.ref ?? ref;
    let refIndex = 1;

    let dialogs: Record<string, NpcDialog | PlayerDialog> = {};

    const dialogChoiceRefs: string[] = (graph.dialogChoices ?? []).map((dialogChoice) => {
        if (typeof dialogChoice === 'string') {
            return dialogChoice;
        }

        if (!dialogChoice.ref) {
            dialogChoice.ref = `${ref}-${refIndex}`;
            dialogs[dialogChoice.ref] = {
                type: 'player',
                content: dialogChoice.content,
                predicate: dialogChoice.predicate ?? (() => true),
                doAction: dialogChoice.doAction,
                test: dialogChoice.test
            } as PlayerDialog;

            if (dialogChoice.nextStep) {
                if (typeof dialogChoice.nextStep === 'string') {
                    dialogs[dialogChoice.ref].nextStep = dialogChoice.nextStep;
                } else {
                    dialogs[dialogChoice.ref].nextStep =
                        dialogChoice.nextStep.ref ?? `${dialogChoice.ref}-${refIndex}`;
                    dialogs = {
                        ...dialogs,
                        ...makeDialogs(dialogChoice.nextStep, `${dialogChoice.ref}-${refIndex}`)
                    };
                }
            }

            if (dialogChoice.successStep) {
                if (typeof dialogChoice.successStep === 'string') {
                    dialogs[dialogChoice.ref].successStep = dialogChoice.successStep;
                } else {
                    dialogs[dialogChoice.ref].successStep =
                        dialogChoice.successStep.ref ?? `${dialogChoice.ref}-s-${refIndex}`;
                    dialogs = {
                        ...dialogs,
                        ...makeDialogs(
                            dialogChoice.successStep,
                            `${dialogChoice.ref}-s-${refIndex}`
                        )
                    };
                }
            }

            if (dialogChoice.failureStep) {
                if (typeof dialogChoice.failureStep === 'string') {
                    dialogs[dialogChoice.ref].failureStep = dialogChoice.failureStep;
                } else {
                    dialogs[dialogChoice.ref].failureStep =
                        dialogChoice.failureStep.ref ?? `${dialogChoice.ref}-f-${refIndex}`;
                    dialogs = {
                        ...dialogs,
                        ...makeDialogs(
                            dialogChoice.failureStep,
                            `${dialogChoice.ref}-f-${refIndex}`
                        )
                    };
                }
            }

            refIndex++;
        }

        return dialogChoice.ref;
    });

    dialogs[ref] = {
        type: 'npc',
        content: graph.content,
        predicate: graph.predicate ?? (() => true),
        doAction: graph.doAction,
        dialogChoices: dialogChoiceRefs
    };

    return dialogs;
};

export const dialogs: Record<string, NpcDialog | PlayerDialog> = {
    ...makeDialogs(ted, 'ted'),
    ...makeDialogs(ned, 'ned'),
    ...makeDialogs(lockedDoor, 'locked-door')
};
