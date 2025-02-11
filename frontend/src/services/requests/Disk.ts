import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { File, Folder } from '@app/data'

export interface DiskDTO {
	files: File[]
	folders: Folder[]
}

const api = axios.create({
	baseURL: `${domenApi}/api/user`,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
})

const Disk = async (): Promise<DiskDTO> => {
	try {
		const response: AxiosResponse<DiskDTO> = await api.get('/disk')

		console.table(response.data)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return { files: [], folders: [] }
	}
}

export default Disk
