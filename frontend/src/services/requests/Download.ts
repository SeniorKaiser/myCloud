// import axios from 'axios'
// import { domenApi } from '@app/data'

// const downloadFile = async (fileId: string): Promise<void> => {
// 	try {
// 		const response = await axios.get(`${domenApi}/files/download`, {
// 			params: { file_id: fileId },
// 			responseType: 'blob',
// 		})
// 		const url = window.URL.createObjectURL(new Blob([response.data]))
// 		const link = document.createElement('a')
// 		link.href = url
// 		link.setAttribute('download', 'file')
// 		document.body.appendChild(link)
// 		link.click()
// 		document.body.removeChild(link)
// 	} catch (error) {
// 		console.error('Ошибка при загрузке файла', error)
// 	}
// }

// export default downloadFile
import { domenApi } from '@app/data'

const downloadFile = async (id: string) => {
	try {
		const response = await fetch(`${domenApi}/api/files/download/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`Ошибка загрузки файла: ${response.statusText}`)
		}

		const blob = await response.blob()
		const url = URL.createObjectURL(blob)

		// Создаём временную ссылку и эмулируем клик
		const a = document.createElement('a')
		a.href = url
		a.download = `file_${id}` // Можно задать другое имя
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)

		// Освобождаем объект URL после скачивания
		URL.revokeObjectURL(url)
	} catch (error) {
		console.error('Ошибка при загрузке файла:', error)
		alert('Не удалось скачать файл.')
	}
}

export default downloadFile
