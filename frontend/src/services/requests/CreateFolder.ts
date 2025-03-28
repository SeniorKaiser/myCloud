import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'
import { Folder } from '@app/data'

const createFolder = async (
	name: string,
	folder_id?: string | undefined
): Promise<Folder> => {
	const loadingToast = toast.loading('Создание папки...')
	try {
		const response = await axios.post(`${domenApi}/api/folder/create`, {
			name: name,
			parent_folder: folder_id,
		})
		toast.success(`Папка создана`, { id: loadingToast })
		return response.data
	} catch (error) {
		toast.error('Ошибка! Папка не создана', { id: loadingToast })
		throw error
	}
}

export default createFolder
