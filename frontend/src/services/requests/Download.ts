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
		const link = document.createElement('a')
		link.href = `${domenApi}/api/file/download/${id}`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	} catch (error) {
		console.error('Ошибка при загрузке файла:', error)
		alert('Не удалось скачать файл.')
	}
}

export default downloadFile
