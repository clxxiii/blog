<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../colors.css';
	import '../app.css';
</script>

<header>
	<Header />
</header>

<main>
	<slot />
</main>

<style>
	header {
		position: fixed;
		display: flex;
		align-items: center;
		padding: 0px 5px;
		top: 0;
		z-index: 1;
		left: 0;
		width: 100%;
		height: 50px;
		background: var(--base-2);
		transition: background 0.3s ease;
	}
	main {
		position: relative;
		top: 50px;
	}
</style>
