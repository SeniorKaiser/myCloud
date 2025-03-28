import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const deleteFile = async (id: string) => {
	const loadingToast = toast.loading('Удаление файла...')
	try {
		const response = await axios.delete(`${domenApi}/api/files/delete/${id}`)
		console.log(response.data)
		toast.success(`Файл удален`, { id: loadingToast })
		return response.data
	} catch (error) {
		console.error(error)
		toast.error('Ошибка! Файл не удален', { id: loadingToast })
	}
}

export default deleteFile
