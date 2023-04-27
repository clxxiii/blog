import { writable } from 'svelte/store';

export const theme = writable<string>('');
export const metadata = writable<Map<string, object> | null>(null);
