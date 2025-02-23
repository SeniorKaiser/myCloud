import { domenApi } from '@app/data'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const renameFolder = async (folderId: string, newName: string) => {
	const loadingToast = toast.loading('Renaming folder...')
	try {
		const response = await axios.put(
			`${domenApi}/api/folder/rename/${folderId}`,
			null,
			{
				params: { name: newName },
			}
		)
		toast.success(`Folder renamed`, { id: loadingToast })
		return response.data
	} catch (error) {
		console.error('Error renaming folder:', error)
		toast.error('Error! Folder not renamed', { id: loadingToast })
		throw error
	}
}

export default renameFolder
