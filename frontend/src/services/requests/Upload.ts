import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const uploadFile = async (file: File, folderId?: string) => {
	const loadingToast = toast.loading('Uploading file...')
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
		toast.success(`File uploaded`, { id: loadingToast })
		return response.data
	} catch (error) {
		console.error(error)
		toast.error('File upload error', { id: loadingToast })
		throw error
	}
}

export default uploadFile
