import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const deleteFile = async (id: string) => {
	const loadingToast = toast.loading('Deleting file...')
	try {
		const response = await axios.delete(`${domenApi}/api/files/delete/${id}`)
		console.log(response.data)
		toast.success(`File deleted`, { id: loadingToast })
		return response.data
	} catch (error) {
		console.error(error)
		toast.error('Error! File not deleted', { id: loadingToast })
	}
}

export default deleteFile
