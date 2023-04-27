import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let theme = '';

	const cookieTheme = event.cookies.get('colortheme');
	if (cookieTheme) theme = cookieTheme;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme=${theme}`)
	});
	return response;
};
