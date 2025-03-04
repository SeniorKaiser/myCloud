const copyToClipboard = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => alert('Текст скопирован!'))
		.catch(err => console.error('Ошибка копирования:', err))
}

export default copyToClipboard
