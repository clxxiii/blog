<script>
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<nav>
	<a href="/">home</a>
	<a href="/articles">articles</a>
</nav>
<div class="theme-switch">
	<ThemeSwitcher />
</div>

<style>
	.theme-switch {
		position: absolute;
		right: 20px;
	}
	a {
		text-transform: uppercase;
		font-weight: bold;
	}
</style>
