import { domenApi } from '@app/data'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const renameFolder = async (folderId: string, newName: string) => {
	const loadingToast = toast.loading('Переименование папки...')
	try {
		const response = await axios.put(
			`${domenApi}/api/folder/rename/${folderId}`,
			null,
			{
				params: { name: newName },
			}
		)
		toast.success(`Папка переименована`, { id: loadingToast })
		return response.data
	} catch (error) {
		console.error('Error renaming folder:', error)
		toast.error('Ошибка! Папка не переименована', { id: loadingToast })
		throw error
	}
}

export default renameFolder
