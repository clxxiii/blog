import type { ServerLoad } from '@sveltejs/kit';
import { getMetadata } from '$lib/ArticleManager';

export const load = (async () => {
	const articles = await getMetadata();
	return { articles };
}) satisfies ServerLoad;
