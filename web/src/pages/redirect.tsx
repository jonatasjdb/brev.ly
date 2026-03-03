import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Logo from "../assets/Logo.svg?react";

export function Redirect() {
	const { code } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchLink() {
                await setTimeout(() => {
                    // window.location.href = 'https://google.com'
                    navigate('/not-found')
                },1500)

		}
        fetchLink()
	});

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
					<a href="#" className="text-blue-base font-medium hover:underline">
						Acesse aqui
					</a>
				</div>
			</div>
		</div>
	);
}
