import { useState } from "react";
import { validateShortUrl, validateUrl } from "../lib/validations";

export function useLinkValidation() {
	const [shortUrlError, setShortUrlError] = useState<string | null>(null);
	const [urlError, setUrlError] = useState<string | null>(null);

	const checkShortUrl = (value: string) => {
		const error = validateShortUrl(value);
		setShortUrlError(error);
		return !error;
	};

	const checkUrl = (value: string) => {
		const error = validateUrl(value);
		setUrlError(error);
		return !error;
	};

	const clearErrors = () => {
		setShortUrlError(null);
		setUrlError(null);
	};

	return {
		shortUrlError,
		urlError,
		checkShortUrl,
		checkUrl,
		clearErrors,
	};
}
