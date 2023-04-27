<script lang="ts">
	import '$lib/markdown.css';
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';
	export let data;
</script>

<svelte:head>
	<title>CLXXIII's Blog Page</title>
</svelte:head>

<div class="header">
	<h1>CLXXIII's Blog</h1>
</div>
{@html data.article}

<style>
	h1 {
		margin: 0;
		position: relative;
		text-align: center;
		font-family: 'Montserrat';
		font-size: 5em;
		width: 100%;
	}
	.header {
		position: relative;
		background: linear-gradient(135deg, rgba(19, 212, 213, 0.5) 0%, rgba(23, 214, 166, 0.5) 100%);
		min-height: 12em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
