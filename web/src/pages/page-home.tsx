import { SpinnerIcon } from "@phosphor-icons/react";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { toast } from "sonner";
import { LinkList } from "../components/link-list";
import { Button } from "../components/ui/button";
import { ButtonIcon } from "../components/ui/button-icon";
import { InputText } from "../components/ui/input-text";
import { useLinks } from "../hooks/links";
import { useLinkValidation } from "../hooks/useLinksValidation";

export function PageHome() {
	const { links, loading, addLink } = useLinks();
	const { shortUrlError, urlError, checkShortUrl, checkUrl, clearErrors } = useLinkValidation();

	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	const [isSaving, setIsSaving] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false)

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
		toast.success("Link cadastrado!");
		} else {
		toast.error(result.message ?? "Erro ao cadastrar");
		}
		setIsSaving(false);
	};

	async function downloadCsv() {

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
					Salvar link
				</Button>
			</div>
			<div className="w-full bg-white rounded-lg p-10 gap-5">
				<div className="flex flex-row justify-between">
					<div className="text-xl text-gray-600 font-bold">Meus Links</div>
					<ButtonIcon onClick={downloadCsv} icon={isDownloading ? <SpinnerIcon className="animate-spin" size={20} /> : <DownloadSimpleIcon size={20} />}>Baixar CSV</ButtonIcon>
				</div>

				<LinkList
					links={links}
					loading={loading}
					onCopy={() => toast.info("Link copiado com sucesso!")}
				/>
			</div>
		</div>
	);
}
