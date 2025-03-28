import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const deleteFolder = async (folderId: string) => {
	const loadingToast = toast.loading('Удаление папки...')
	try {
		const response = await axios.delete(
			`${domenApi}/api/folder/delete/${folderId}`
		)
		console.log('Папка удалена:', response.data)
		toast.success(`Папка удалена`, { id: loadingToast })
	} catch (error) {
		toast.error('Ошибка! Папка не удалена', { id: loadingToast })
	}
}
export default deleteFolder
