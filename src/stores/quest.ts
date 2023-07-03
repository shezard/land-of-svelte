import { get, writable } from 'svelte/store';

type QuestName = 'ned';

interface Quest {
    flag: string;
}

export type Quests = Partial<Record<QuestName, Quest>>;

export const quests = writable<Quests>({});

export const hasQuestFlag = (name: QuestName, flag: string): boolean => {
    const quest = get(quests)[name];

    if (quest === undefined) {
        return false;
    }

    return quest.flag === flag;
};

export const setQuestFlag = (name: QuestName, flag: string): void => {
    quests.update((quests) => {
        quests[name] = {
            flag: flag
        };

        return quests;
    });
};
