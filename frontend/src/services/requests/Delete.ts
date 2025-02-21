import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const deleteFile = async (id: string) => {
	const loadingToast = toast.loading('Deleting file...')
	try {
		const response = await axios.delete(`${domenApi}/api/files/delete/${id}`)
		console.log(response.data)
		toast.success(`File has been deleted`, { id: loadingToast })
		window.location.reload()
		return response.data
	} catch (error) {
		console.error(error)
		toast.error('File deletion error', { id: loadingToast })
	}
}

export default deleteFile
