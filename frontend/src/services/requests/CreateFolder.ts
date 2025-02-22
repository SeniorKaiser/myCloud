import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const createFolder = async (name: string, folder_id?: string | undefined) => {
	const loadingToast = toast.loading('Creating folder...')
	try {
		const response = await axios.post(`${domenApi}/api/folder/create`, {
			name: name,
			parent_folder: folder_id,
		})
		toast.success(`Folder created`, { id: loadingToast })
		return response.data
	} catch (error) {
		toast.error('Error! Folder not created', { id: loadingToast })
		throw error
	}
}

export default createFolder
