// stores/links-store.ts
import { create } from "zustand";
import { getLinks } from "../services/link-services";

export type Link = {
	id: string;
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
};

interface LinksStore {
	links: Link[];
	loading: boolean;
	fetchLinks: () => Promise<void>;
	incrementAccess: (shortUrl: string) => void;
	addLinks: (link: Link) => void;
	removeLinks: (id: string) => void;
}

export const useLinksStore = create<LinksStore>((set) => ({
	links: [],
	loading: true,

	fetchLinks: async () => {
		const response = await getLinks();
		set({ links: response.data, loading: false });
	},

	addLinks: (link: Link) =>
		set((state) => ({
			links: [link, ...state.links],
		})),

	removeLinks: (id) =>
		set((state) => ({
			links: state.links.filter((link) => link.id !== id),
		})),

	incrementAccess: (shortUrl) =>
		set((state) => ({
			links: state.links.map((link) =>
				link.shortUrl === shortUrl
					? { ...link, accessCount: link.accessCount + 1 }
					: link,
			),
		})),
}));
