<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	export let data;
	let articles: object[] = [];
	data.articles.forEach((x) => articles.push(x));
	console.log(articles);
	articles = articles
		.filter((x) => x.name != 'First') // Filter out home page
		.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
</script>

<svelte:head>
	<title>Article List</title>
</svelte:head>

<div class="articles">
	{#each articles as article}
		<ArticleCard post={article} />
	{/each}
</div>

<style>
	.articles {
		width: 90%;
		max-width: 800px;
		margin: auto;
	}
</style>
