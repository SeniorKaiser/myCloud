import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'
import { File as FileDTO } from '@app/data'

const uploadFile = async (file: File, folderId?: string): Promise<FileDTO> => {
	const loadingToast = toast.loading('Загрузка файла...')

	const formData = new FormData()
	formData.append('file', file)

	try {
		const response = await axios.post(
			`${domenApi}/api/files/upload`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
				params: folderId ? { parent_folder: folderId } : {},
			}
		)
		console.log('Файл загружен', response.data)
		toast.success('File uploaded', { id: loadingToast })
		return response.data
	} catch (error) {
		console.error('Ошибка! Файл не загружен', error)
		toast.error('File upload error', { id: loadingToast })
		throw error
	}
}

export default uploadFile
