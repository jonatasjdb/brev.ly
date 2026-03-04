import { api } from "./api";

export type PostLinks = {
	url: string;
	shortUrl: string;
};

export async function getLinks() {
	const response = await fetch(`${api.baseUrl}/links`);

	return response.json();
}

export async function postLinks({ url, shortUrl }: PostLinks) {
	const response = await fetch(`${api.baseUrl}/links`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ link: url, shortLink: shortUrl }),
	});

	const data = await response.json();

	return { status: response.status, data };
}

export async function accessCount(id: string) {
	const { status } = await fetch(`${api.baseUrl}/links/${id}/access`, {
		method: "POST",
	});

	return { status };
}

export async function deleteLink(id: string) {
	const response = await fetch(`${api.baseUrl}/links/${id}`, {
		method: "DELETE",
	});

	return { status: response.status };
}

export async function getOriginalLink(shortUrl: string) {
	const response = await fetch(`${api.baseUrl}/links/${shortUrl}`);
	const data = await response.json();

	return { status: response.status, data };
}

export async function getexportLinks() {
	const response = await fetch(`${api.baseUrl}/links/export`);

	const data = await response.json();

	return { status: response.status, data };
}
