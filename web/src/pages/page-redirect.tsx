import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Logo from "../assets/Logo.svg?react";
import { useLinks } from "../hooks/useLinks";

export function PageRedirect() {
	const { code } = useParams();
	const navigate = useNavigate();

	const {getOriginalUrl, incrementAccessLink, } = useLinks()

	const [url, setUrl] = useState("#")

	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		async function fetchLink() {
			if(!code) {
				navigate("/page-not-found");
				return
			}

			const result = await getOriginalUrl(code);

			if (!result.success) {
				navigate("/page-not-found");
				return;
			}

			await incrementAccessLink(result.data.id, code);

			const url = result.data.url
			setUrl(url)
			return window.location.replace(url);
		}

		fetchLink();
}, [code, navigate, getOriginalUrl, incrementAccessLink]);

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-4">
			<div className="w-full max-w-lg bg-white rounded-lg p-8 text-center">
				<div className="flex justify-center mb-7">
					<Logo />
				</div>

				<h1 className="text-2xl font-semibold text-gray-800 mb-3">
					Redirecionando...
				</h1>

				<div className="text-sm text-gray-600 ">
					O link será aberto automaticamente em alguns instantes.
				</div>

				<div className="text-sm text-gray-600">
					Não foi redirecionado?{" "}
					<a href={url} className="text-blue-base font-medium hover:underline">
						Acesse aqui
					</a>
				</div>
			</div>
		</div>
	);
}
