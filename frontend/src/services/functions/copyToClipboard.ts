export const copyToClipboard = async (text: string | undefined) => {
	try {
		if (text) {
			await navigator.clipboard.writeText(text)
		}
	} catch (err) {
		console.error('Ошибка при копировании в буфер обмена', err)
	}
}
