import { getFile, getMetadata } from '$lib/ArticleManager';
import type { ServerLoad } from '@sveltejs/kit';
import showdownHighlight from 'showdown-highlight';
import { Converter } from 'showdown';
import { error } from '@sveltejs/kit';
const converter = new Converter({
	tables: true,
	metadata: true,
	extensions: [
		showdownHighlight({
			pre: true,
			auto_detection: true
		})
	]
});

export const load: ServerLoad = async ({ url, params }) => {
	const name = params.id?.toLowerCase() ?? '';
	const metadata = await getMetadata();
	const postdata = metadata.get(name);

	if (!postdata) throw error(404);

	const post = await getFile(postdata.path);
	const article = converter.makeHtml(post.content);
	return { article, postdata };
};
