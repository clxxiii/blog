<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	export let data;
	let articles: object[] = [];
	data.articles.forEach((x) => articles.push(x));
	console.log(articles);
	articles = articles.filter((x) => x.name != 'First'); // Filter out home page
</script>

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
