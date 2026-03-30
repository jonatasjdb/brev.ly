import {
	CopyIcon,
	LinkIcon,
	SpinnerIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { ButtonIcon } from "./ui/button-icon";
import { Loading } from "./ui/loading";

type LinkItemProps = {
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
	onCopy?: () => void;
	onDelete?: () => Promise<void>;
};

type LinkListProps = {
	links: {
		id: string;
		shortUrl: string;
		originalUrl: string;
		accessCount: number;
	}[];
	onCopy?: (link: string) => void;
	onDelete?: (link: string) => void;
	loading: boolean;
};

function LinkItem({
	shortUrl,
	originalUrl,
	accessCount,
	onCopy,
	onDelete,
}: LinkItemProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async() => {
		const confirmed = confirm("Tem certeza de que deseja excluir?")
		if(!confirmed) return

		setIsDeleting(true)

		try {
			await onDelete?.()
		} catch {
			setIsDeleting(false)
		}
	}

	const urlBrev = `${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`
	return (
		<>
			<div className="border-t border-gray-200 my-6" />

			<div className="flex justify-between">
				<div>
					<a href={urlBrev} target="_blank" className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">
						{urlBrev}
					</a>
					<div className="text-sm text-gray-400">
						<span title={originalUrl}>{originalUrl.length > 100 ? `${originalUrl.slice(0,100)}...` : originalUrl}</span>
					</div>
				</div>

				<div className="flex items-center max-md:gap-3 gap-7">
					<span className="max-md:text-[11px] text-sm text-gray-400">
						{accessCount} {accessCount === 1 ? "acesso" : "acessos"}
					</span>

					<div className="flex items-center gap-2">
						<ButtonIcon
							icon={<CopyIcon size={20} />}
							onClick={() => {
								navigator.clipboard.writeText(urlBrev);
								onCopy?.();
							}}
							disabled={isDeleting}
						/>
						<ButtonIcon
							icon={isDeleting ? <SpinnerIcon size={20} className="animate-spin" /> : <TrashIcon size={20} />}
							onClick={handleDelete}
							disabled={isDeleting}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

function EmptyState() {
	return (
		<>
			<div className="border-t border-gray-200 my-6" />
			<div className="flex flex-col items-center">
				<LinkIcon size={40} opacity={0.5} />
				<div className="text-sm text-gray-400 mt-2">
					Ainda não existem itens cadastrados
				</div>
			</div>
		</>
	);
}

export function LinkList({ links, onCopy, onDelete, loading }: LinkListProps) {
	if (loading) {
		return <Loading>Carregando Links...</Loading>;
	}

	return (
		<div className="overflow-y-auto max-h-162.5 px-1 mt-2">
			{links.length === 0 ? (
				<EmptyState />
			) : (
				links.map((link) => (
					<LinkItem
						key={link.id}
						shortUrl={link.shortUrl}
						originalUrl={link.originalUrl}
						accessCount={link.accessCount}
						onCopy={() => onCopy?.(link.shortUrl)}
						onDelete={async () => onDelete?.(link.id)}
					/>
				))
			)}
		</div>
	);
}
