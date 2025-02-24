import axios from 'axios'
import { domenApi } from '@app/data'
import { toast } from 'react-hot-toast'

const renameFile = async (id: string, newName: string) => {
	const loadingToast = toast.loading('Rename file...')
	try {
		const response = await axios.put(`${domenApi}/api/files/rename/${id}`, {
			params: { new_name: newName },
			headers: {
				'Content-Type': 'application/json',
			},
		})
		toast.success(`File renamed`, { id: loadingToast })
		return response.data
	} catch (error: any) {
		toast.error('Error! File not renamed', { id: loadingToast })
		throw new Error(error.response?.data?.message || 'Ошибка запроса')
	}
}

export default renameFile
