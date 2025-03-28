import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const renameFile = async (id: string, newName: string) => {
	const loadingToast = toast.loading('Переименование файла...')
	try {
		const response = await axios.put(
			`${domenApi}/api/files/rename/${id}`,
			null,
			{ params: { new_name: newName } }
		)
		toast.success(`Файл переименован`, { id: loadingToast })
		return response.data
	} catch (error: any) {
		toast.error('Ошибка! Файл не переименован', { id: loadingToast })
		throw new Error(error.response?.data?.message || 'Ошибка запроса')
	}
}

export default renameFile
