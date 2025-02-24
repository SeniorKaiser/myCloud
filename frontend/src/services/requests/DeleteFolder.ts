import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const deleteFolder = async (folderId: string) => {
	const loadingToast = toast.loading('Deleting folder...')
	try {
		const response = await axios.delete(
			`${domenApi}/api/folder/delete/${folderId}`
		)
		console.log('Папка удалена:', response.data)
		toast.success(`Folder deleted`, { id: loadingToast })
	} catch (error) {
		toast.error('Error! Folder not deleted', { id: loadingToast })
	}
}
export default deleteFolder
