import { SpinnerIcon } from "@phosphor-icons/react";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { toast } from "sonner";
import { LinkList } from "../components/link-list";
import { Button } from "../components/ui/button";
import { ButtonIcon } from "../components/ui/button-icon";
import { InputText } from "../components/ui/input-text";
import { useLinks } from "../hooks/useLinks";
import { useLinkValidation } from "../hooks/useLinksValidation";

export function PageHome() {
	const { links, loading, addLink, removeLink, exportLinks, isDownloading } = useLinks();
	const { shortUrlError, urlError, checkShortUrl, checkUrl, clearErrors } = useLinkValidation();

	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	const [isSaving, setIsSaving] = useState(false);

	const handleShortUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setShortUrl(value);
		checkShortUrl(value);
  	};

  	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase().replace(/\s/g, "");
		setUrl(value);
		checkUrl(value);
  	};

	const handleSave = async () => {
		const isShortValid = checkShortUrl(shortUrl);
		const isUrlValid = checkUrl(url);

		if (!isShortValid || !isUrlValid) return;

		setIsSaving(true);
		const result = await addLink({ shortUrl, url });

		if (result.success) {
		setUrl("");
		setShortUrl("");
		clearErrors();
		toast.success(result.message);
		} else {
		toast.error(result.message ?? "Erro ao cadastrar.");
		}
		setIsSaving(false);
	};

	const handleDeleteLink = async(id: string) => {
		const result = await removeLink(id)

		if(result.success){
			toast.success(result.message)
		} else {
			toast.error(result.message)
		}
	}

	async function handleCsv() {
		const result = await exportLinks()

		if (!result.success) {
			toast.error(result.message);
		}
	}

	return (
		<div className="flex flex-col md:flex-row gap-5 items-start">
			<div className="w-full flex flex-col bg-white rounded-lg md:max-w-100 p-10 gap-5">
				<div className="text-xl text-gray-600 font-bold">Novo Link</div>
				<InputText
					label="LINK ORIGINAL"
					value={url}
					onChange={handleUrlChange}
					error={urlError}
					placeholder="https://exemplo.com"
				/>
				<InputText
					label="LINK ENCURTADO"
					value={shortUrl}
					prefix="brev.ly"
					onChange={handleShortUrlChange}
					error={shortUrlError}
					placeholder="meu-link"
				/>
				<Button onClick={handleSave} disabled={isSaving}>
					{isSaving ? "Salvando Link..." : "Salvar link"}
				</Button>
			</div>
			<div className="w-full bg-white rounded-lg p-10 gap-5">
				<div className="flex flex-row justify-between">
					<div className="text-xl text-gray-600 font-bold">Meus Links</div>
					<ButtonIcon onClick={handleCsv} icon={isDownloading ? <SpinnerIcon className="animate-spin" size={20} /> : <DownloadSimpleIcon size={20} />} disabled={isDownloading || links.length === 0}>Baixar CSV</ButtonIcon>
				</div>

				<LinkList
					links={links}
					loading={loading}
					onCopy={(shortUrl) => toast.info(`O link ${shortUrl} foi para a área de transferência.`)}
					onDelete={handleDeleteLink}
				/>
			</div>
		</div>
	);
}
