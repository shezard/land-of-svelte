import { derived, writable } from 'svelte/store';

export const logs = writable<string[]>(['Welcome to "Land of Svelte"']);

export const lastLogs = derived(logs, (logs) => {
	return logs.slice(-3);
});
