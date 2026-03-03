
import NotFoundImage from "../assets/404.svg?react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-lg p-8 text-center">

        <div className="flex justify-center mb-7">
            <NotFoundImage />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Link Não Encontrado
        </h1>

        <div className="text-sm text-gray-600 ">
          O link que você está tentando salvar não existe, foi removido ou é uma URl inválida. Saiba mais em{" "}
          <a href="/" className="text-blue-base font-medium hover:underline">
            brev.ly
          </a>
        </div>
      </div>
    </div>
  )
}
