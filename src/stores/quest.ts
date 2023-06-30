import { get, writable } from 'svelte/store';

type QuestName = 'ned';

interface Quest {
    flag: string;
}

type Quests = Partial<Record<QuestName, Quest>>;

export const quests = writable<Quests>({});

export const hasQuestFlag = (name: QuestName, flag: string) => {
    const quest = get(quests)[name];

    if (quest === undefined) {
        return false;
    }

    return quest.flag === flag;
};
