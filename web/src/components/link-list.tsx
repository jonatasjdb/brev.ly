import { CopyIcon, LinkIcon, TrashIcon } from "@phosphor-icons/react";
import { ButtonIcon } from "./ui/button-icon";
import { Loading } from "./ui/loading";

type LinkItemProps = {
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
	onCopy?: () => void;
	onDelete?: () => void;
};

type LinkListProps = {
	links: {
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
	return (
		<>
			<div className="border-t border-gray-200 my-6" />

			<div className="flex justify-between">
				<div>
					<div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">
						{`${import.meta.env.VITE_FRONTEND_URL}/${shortUrl}`}
					</div>
					<div className="text-sm text-gray-400">{originalUrl}</div>
				</div>

				<div className="flex items-center max-md:gap-3 gap-7">
					<span className="max-md:text-[11px] text-sm text-gray-400">
						{accessCount} acessos
					</span>

					<div className="flex items-center gap-2">
						<ButtonIcon
							icon={<CopyIcon size={20} />}
							onClick={() => {
								navigator.clipboard.writeText(originalUrl);
								onCopy?.();
							}}
						/>
						<ButtonIcon
							icon={<TrashIcon size={20} />}
							onClick={() => {
								if (!confirm("Tem certeza que deseja excluir este link?"))
									return;
								console.log("Excluir aqui");
								onDelete?.();
							}}
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
				links.map((link, index) => (
					<LinkItem
						key={index}
						shortUrl={link.shortUrl}
						originalUrl={link.originalUrl}
						accessCount={link.accessCount}
						onCopy={() => onCopy?.(link.shortUrl)}
						onDelete={() => onDelete?.(link.shortUrl)}
					/>
				))
			)}
		</div>
	);
}
