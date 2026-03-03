import { CopyIcon, DownloadIcon, LinkBreakIcon, LinkIcon, LinkSimpleBreakIcon, TrashIcon } from "@phosphor-icons/react";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../components/ui/button";
import { ButtonIcon } from "../components/ui/button-icon";
import { InputText } from "../components/ui/input-text";

export function PageHome() {
	return (
		<div className="flex flex-col md:flex-row gap-5 items-start">
			<div className="w-full flex flex-col bg-white rounded-lg md:max-w-100 p-10 gap-5">
				<div className="text-xl text-gray-600 font-bold">Novo Link</div>
				<InputText label="LINK ORIGINAL"></InputText>
				<InputText label="LINK ENCURTADO"></InputText>
				<Button disabled>Salvar link</Button>
			</div>
			<div className="w-full bg-white rounded-lg p-10 gap-5">
				<div className="flex flex-row justify-between">
					<div className="text-xl text-gray-600 font-bold">Meus Links</div>
					<ButtonIcon
						icon={<DownloadSimpleIcon size={20} />}
					>
						Baixar CSV
					</ButtonIcon>
				</div>
                {/*
                <div className="border-t border-gray-200 my-6"></div>

                 <div className="flex flex-col items-center">
                    <LinkIcon size={40} opacity={0.5} />
                    <div className="text-sm text-gray-400 mt-2">Ainda não existem itens cadastrados</div>
                </div>
                */}

                <div className="overflow-y-scroll max-h-[650px] px-1 mt-2">
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="flex justify-between">
                        <div>
                            <div className="max-md:text-[13px] text-blue-base font-semibold cursor-pointer">brev.ly/Portfolio-Dev</div>
                            <div className="text-sm text-gray-400">google.com</div>
                        </div>
                        <div className="flex items-center max-md:gap-3 gap-7">
                        <span className="max-md:text-[11px] text-sm text-gray-400">30 acessos</span>
                            <div className="flex items-center gap-2">
                                <ButtonIcon icon={<CopyIcon size={20} />} />
                                <ButtonIcon icon={<TrashIcon size={20} />} />
                            </div>
                        </div>
                    </div>
                </div>

			</div>
		</div>
	);
}
