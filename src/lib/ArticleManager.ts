import { metadata as metadataStore } from './stores';
import {
	GITLAB_ACCESS_TOKEN,
	PROJECT_URL,
	PROJECT_PUBLIC_DIRECTORY,
	PROJECT_BRANCH,
	PROJECT_METADATA_FILE
} from '$env/static/private';
import { get } from 'svelte/store';
/**
 * The following file contains a list of methods, given a gitlab access token,
 * to fetch data from a specific folder.
 */

type ProjectResponseData = { id: string; name: string; type: string; path: string; mode: string }[];

const BASE_URL = 'https://gitlab.com/api/v4';

/**
 * Returns the contents of a folder
 */
export const getFolder = async (folder: string) => {
	const headers: Headers = new Headers();
	if (GITLAB_ACCESS_TOKEN) {
		headers.set('Authorization', 'Bearer ' + GITLAB_ACCESS_TOKEN);
	}

	const encodedProject = PROJECT_URL.replaceAll('/', '%2F');
	const path = `${PROJECT_PUBLIC_DIRECTORY}%2F${folder.replaceAll('/', '%2F')}`;
	const url = `${BASE_URL}/projects/${encodedProject}/repository/tree?path=${path}`;

	const res = await fetch(url, { headers });
	const articleFolder: ProjectResponseData = await res.json();

	// for (const article of articleFolder) {
	// 	const file = await getFile(article.path);
	// 	articleArray.push(file);
	// }

	return articleFolder;
};

/**
 * Returns the parsed content of the metadata file, which contains all reviews and articles
 */
export const getMetadata = async (force?: boolean) => {
	if (!force) {
		const data = get(metadataStore);
		if (data) {
			return data;
		}
	}

	console.log('Fetching metadata from repo...');
	const headers: Headers = new Headers();
	if (GITLAB_ACCESS_TOKEN) {
		headers.set('Authorization', 'Bearer ' + GITLAB_ACCESS_TOKEN);
	}

	const encodedProject = PROJECT_URL.replaceAll('/', '%2F');
	const path = PROJECT_METADATA_FILE.replaceAll('/', '%2F');
	const url = `${BASE_URL}/projects/${encodedProject}/repository/files/${path}?ref=${PROJECT_BRANCH}`;

	const res = await fetch(url, { headers });
	const articleContent = await res.json();
	const content = Buffer.from(articleContent.content, articleContent.encoding).toString('ascii');

	const metadata = parseMetadata(content);
	metadataStore.set(metadata);

	return metadata;
};

/**
 * Fetches a file based on it's filepath, and decodes the Base64
 */
export const getFile = async (path: string) => {
	const encodedProject = PROJECT_URL.replaceAll('/', '%2F');
	const filePath = path.replaceAll('/', '%2F');

	const headers: Headers = new Headers();
	if (GITLAB_ACCESS_TOKEN) {
		headers.set('Authorization', 'Bearer ' + GITLAB_ACCESS_TOKEN);
	}
	const url = `${BASE_URL}/projects/${encodedProject}/repository/files/${filePath}?ref=${PROJECT_BRANCH}`;

	const res = await fetch(url, { headers });
	const articleContent = await res.json();
	const content = Buffer.from(articleContent.content, articleContent.encoding).toString('ascii');
	articleContent.content = content;
	return articleContent;
};

function parseMetadata(data: string) {
	const split = data.split('\n');
	const articles = new Map<string, object>();
	let topic = '';
	let file = '';
	let caseFile = '';
	const currentFileProperties = new Map<string, string>();
	for (const line of split) {
		const topicRegex = line.match(/^# (\w+)/);
		if (topicRegex) {
			topic = topicRegex[1].toLowerCase();
			continue;
		}

		const fileRegex = line.match(/^## \[\[(\w+)\]\]/);
		if (fileRegex) {
			if (file != '') articles.set(file, Object.fromEntries(currentFileProperties));
			currentFileProperties.clear();
			currentFileProperties.set('name', fileRegex[1]);
			currentFileProperties.set('path', `${PROJECT_PUBLIC_DIRECTORY}/${topic}/${fileRegex[1]}.md`);
			file = fileRegex[1].toLowerCase();
			caseFile = fileRegex[1];
			currentFileProperties.set('href', `/${topic}/${file}`);
			continue;
		}

		const propertyRegex = line.match(/- (\w+): /);
		if (propertyRegex) {
			const key = propertyRegex[1];
			const value = line.replace(`- ${key}: `, '');
			currentFileProperties.set(key, value);
			continue;
		}
	}
	currentFileProperties.set('name', caseFile);
	currentFileProperties.set('path', `${PROJECT_PUBLIC_DIRECTORY}/${topic}/${caseFile}.md`);
	articles.set(file, Object.fromEntries(currentFileProperties));

	return articles;
}
