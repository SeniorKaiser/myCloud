import axios from 'axios'
import { domenApi } from '@app/data'

const uploadFile = async (file: File, folderId?: string) => {
	const formData = new FormData()
	formData.append('file', file)
	if (folderId) {
		formData.append('folder_id', folderId)
	}
	console.log('Отправляемые данные:')
	for (let pair of formData.entries()) {
		console.log(pair[0], pair[1])
	}
	try {
		const response = await axios.post(`${domenApi}/api/files/upload`, formData)

		console.log('Файл успешно загружен:', response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default uploadFile
