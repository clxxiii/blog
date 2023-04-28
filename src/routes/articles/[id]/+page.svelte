<script lang="ts">
	import '$lib/markdown.css';
	import '$lib/tag-colors.css';
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';

	type Data = {
		article: string;
		postdata: {
			title?: string;
			publishDate?: string;
			tags?: string;
			description?: string;
		};
	};

	export let data: Data;

	let { article, postdata } = data;
	let { title, publishDate, tags } = postdata;

	let format = { month: 'short', day: 'numeric', year: 'numeric' };
	let date = new Date(publishDate).toLocaleString('en-us', format);
</script>

<svelte:head>
	<title>{postdata.title}</title>
</svelte:head>

<div class="header">
	<div class="title">{title}</div>
	<div class="date">{date}</div>
	<div class="tags">
		{#if tags}
			{#each tags.split(', ') as tag}
				<div data-name={tag} class="tag">{tag}</div>
			{/each}
		{/if}
	</div>
</div>
<article class="content">
	{@html article}
</article>

<style>
	article {
		width: calc(100% - 20px);
		max-width: 800px;
		margin: auto;
		margin-bottom: 5em;
	}
	.title {
		height: 100%;
		grid-area: a;
		font-size: 5em;
		display: flex;
		align-items: center;
		justify-self: center;
		text-align: center;
		font-family: 'Montserrat';
		font-weight: 800;
	}
	.header {
		position: relative;
		background: linear-gradient(135deg, rgba(19, 212, 213, 0.5) 0%, rgba(23, 214, 166, 0.5) 100%);
		display: grid;
		grid-template-areas:
			'a a'
			'b c';
		min-height: 12em;
	}
	.date {
		grid-area: c;
		padding: 5px;
		display: flex;
		align-items: flex-end;
		justify-self: flex-end;
	}
	.tags {
		grid-area: b;
		padding: 5px;
		display: flex;
		align-items: flex-end;
		justify-self: flex-start;
	}
</style>
