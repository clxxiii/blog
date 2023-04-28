import { getFile } from '$lib/ArticleManager';
import type { ServerLoad } from '@sveltejs/kit';
import showdownHighlight from 'showdown-highlight';
import showdown from 'showdown';
const { Converter } = showdown;
const converter = new Converter({
	tables: true,
	metadata: true,
	ghCompatibleHeaderId: true,
	extensions: [
		showdownHighlight({
			pre: true,
			auto_detection: true
		})
	]
});

export const load: ServerLoad = async () => {
	const post = await getFile('Public/articles/First.md');
	const article = converter.makeHtml(post.content);
	return { article };
};
