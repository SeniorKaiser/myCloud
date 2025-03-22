import { toast } from 'react-hot-toast'

const copyToClipboard = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => toast.success('Текст скопирован!'))
		.catch(err => console.error('Ошибка копирования:', err))
}

export default copyToClipboard
