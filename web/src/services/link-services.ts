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
	const { statusCode, body } = await fetch(
		`${api.baseUrl}/links/${id}/access`,
		{
			method: "POST",
		},
	);

	return { statusCode, body };
}
