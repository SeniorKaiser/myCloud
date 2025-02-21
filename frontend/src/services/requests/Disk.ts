import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { File, Folder } from '@app/data'
import { toast } from 'react-hot-toast'

export interface DiskDTO {
	files: File[]
	folders: Folder[]
}

const api = axios.create({
	baseURL: `${domenApi}/api/user`,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
})

const Disk = async (folder_id?: string): Promise<DiskDTO> => {
	const loadingToast = toast.loading('Disk...')
	try {
		const response: AxiosResponse<DiskDTO> = await api.get('/disk', {
			params: folder_id ? { folder_id } : undefined,
		})

		console.table(response.data)
		toast.success(`Disk`, {
			id: loadingToast,
		})
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		toast.error('Disk error', { id: loadingToast })
		return { files: [], folders: [] }
	}
}

export default Disk
