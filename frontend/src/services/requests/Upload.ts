import axios from 'axios'
import { domenApi } from '@app/data'

const uploadFile = async (file: File, folderId?: string) => {
	const formData = new FormData()
	formData.append('file', file)

	if (folderId) {
		formData.append('folder_id', folderId)
	}
	try {
		const response = await axios.post(
			`${domenApi}/api/files/upload`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		window.location.reload()
		return response.data
	} catch (error) {
		console.error('Ошибка загрузки файла:', error)
		throw error
	}
}

export default uploadFile
