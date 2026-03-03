// Validação simples para shortUrl
export const validateShortUrl = (value: string): string | null => {
	if (value.length < 3) return "Mínimo 3 caracteres";
	if (value.length > 20) return "Máximo 20 caracteres";
	if (!/^[a-zA-Z0-9_-]+$/.test(value)) return "Apenas letras, números, - e _";
	return null;
};

// Validação simples para URL
export const validateUrl = (value: string): string | null => {
	if (!value) return "URL é obrigatória";
	if (/\s/.test(value)) return "Não pode conter espaços";
	if (value !== value.toLowerCase()) return "Use apenas minúsculas";
	if (!/^[a-z0-9:/._-]+$/.test(value)) return "Caracteres inválidos";

	try {
		new URL(value);
		return null;
	} catch {
		return "URL inválida (use http:// ou https://)";
	}
};
