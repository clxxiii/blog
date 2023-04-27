<script lang="ts">
	import { theme as themeStore } from '$lib/stores';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	const click = () => {
		const theme = get(themeStore);
		themeStore.set(theme == 'dark' ? 'light' : 'dark');
		console.log(theme);
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme == 'dark' ? 'light' : 'dark');
			document.cookie = `colortheme=${theme == 'dark' ? 'light' : 'dark'}`;
		}
	};

	onMount(() => {
		if (browser) {
			let theme = document.documentElement.getAttribute('data-theme');
			themeStore.set(theme);
		}
	});
</script>

<button on:click={click}>
	{#if $themeStore == 'dark'}
		<span class="material-symbols-outlined"> light_mode </span>
	{/if}
	{#if $themeStore == 'light'}
		<span class="material-symbols-outlined"> dark_mode </span>
	{/if}
</button>

<style>
	button {
		background: var(--base-2);
		color: var(--text-color);
		border: 0;
		cursor: pointer;
		height: 40px;
		width: 40px;
		border-radius: 4px;
		transition: 0.3s ease;
	}
	button span {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button:hover {
		background: var(--light-base);
	}
</style>
