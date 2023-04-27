<script lang="ts">
	export let post;
	import '../tag-colors.css';

	let { title, publishDate, description, tags, href } = post;

	let format = { month: 'short', day: 'numeric', year: 'numeric' };
	let date = new Date(publishDate).toLocaleString('en-us', format);
</script>

<a class="post" {href}>
	<h1 class="title">{title}</h1>
	<div class="desc">{description || ''}</div>
	<div class="date">{date}</div>
	<div class="tags">
		{#if tags}
			{#each tags.split(', ') as tag}
				<span data-name={tag} class="tag">{tag}</span>
			{/each}
		{/if}
	</div>
</a>

<style>
	.post {
		display: block;
		position: relative;
		height: 10em;
		padding: 10px;
		margin: 20px 0px;
		color: var(--text-color);
		text-decoration: none;
		background-color: var(--base-2);
		transition: 0.2s ease;
		box-shadow: 0 0 0 var(--base-3);
	}

	.desc {
		color: var(--light-text-color);
	}

	.date {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	h1 {
		margin: 0;
		font-family: var(--heading-font);
	}

	.tags {
		position: absolute;
		bottom: 10px;
		left: 10px;
	}

	.post:hover {
		transform: translate(-5px, -5px);
		box-shadow: 10px 10px 0 var(--base-3);
	}
</style>
