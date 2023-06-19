import { writable } from 'svelte/store';
import type { Item } from '..';

type ContainerStore = {
	name: string;
	bag: Item[];
};

export const container = writable<ContainerStore>({
	name: '',
	bag: []
});
