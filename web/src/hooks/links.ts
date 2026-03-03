import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import {
	accessCount,
	getLinks,
	type PostLinks,
	postLinks,
} from "../services/link-services";

export type Link = {
	id: string;
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
};

export function useLinks() {
	const [links, setLinks] = useState<Link[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const links = await getLinks();
			setLinks(links.data);
			setLoading(false);
		}

		fetchData();
	}, []);

	async function addLink({ url, shortUrl }: PostLinks) {
		try {
			const newLink = await postLinks({ url, shortUrl });

			switch (newLink.status) {
				case 400:
					return { success: false, message: "URL inválida" };
				case 409:
					return { success: false, message: "Link encurtado já existente" };
				default:
					setLinks((prev) => [newLink.data, ...prev]);
					return { success: true, message: "Cadastro realizado com sucesso!" };
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async function accessLink(id: string) {
		const { statusCode, body } = await accessCount(id);
		console.log(body);
		// Navigate('')
	}

	return { links, loading, addLink, accessLink };
}
