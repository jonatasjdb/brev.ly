import { useEffect, useState } from "react";
import {
	accessCount,
	deleteLink,
	getexportLinks,
	getOriginalLink,
	type PostLinks,
	postLinks,
} from "../services/link-services";
import { useLinksStore } from "../store/links-store";

export type Link = {
	id: string;
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
};

export function useLinks() {
	const { links, loading, fetchLinks, incrementAccess, addLinks, removeLinks } =
		useLinksStore();
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		fetchLinks();
		function handleVisibilityChange() {
			if (document.visibilityState === "visible") {
				fetchLinks();
			}
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [fetchLinks]);

	async function addLink({ url, shortUrl }: PostLinks) {
		try {
			const response = await postLinks({ url, shortUrl });

			switch (response.status) {
				case 400:
					return { success: false, message: "URL inválida." };
				case 409:
					return { success: false, message: "Link encurtado já existente." };
				default:
					addLinks(response.data);
					return { success: true, message: "Cadastro realizado com sucesso!" };
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async function incrementAccessLink(id: string, shortUrl: string) {
		const { status } = await accessCount(id);

		if (status !== 200) {
			return { sucess: false, message: "Link não encontrado." };
		}

		incrementAccess(shortUrl);

		return;
	}

	async function removeLink(id: string) {
		try {
			const { status } = await deleteLink(id);

			if (status !== 204) {
				return { success: false, message: "Link não encontrado." };
			}

			removeLinks(id);
			return { success: true, message: "Link excluído com sucesso." };
		} catch {
			return { success: false, message: "Erro ao excluir o link." };
		}
	}

	async function getOriginalUrl(shortUrl: string) {
		try {
			const { status, data } = await getOriginalLink(shortUrl);
			if (status !== 200) {
				return { success: false };
			} else {
				return { success: true, data };
			}
		} catch {
			return { sucess: false };
		}
	}

	async function exportLinks() {
		setIsDownloading(true);
		try {
			const { status, data } = await getexportLinks();

			if (status !== 200) {
				return {
					success: false,
					message: "Não foi possível exportar os links.",
				};
			}

			const link = document.createElement("a");
			link.href = data.reportUrl;
			link.download = data.reportUrl.split("downloads/")[1];
			document.body.appendChild(link);
			link.click();
			link.remove();

			setIsDownloading(false);

			return;
		} catch {
			// setError("Não foi possível baixar o arquivo");
		} finally {
			// setLoading(false);
		}
	}

	return {
		links,
		loading,
		addLink,
		removeLink,
		getOriginalUrl,
		exportLinks,
		isDownloading,
		incrementAccess,
		incrementAccessLink,
	};
}
