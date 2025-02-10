import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { File, Folder } from '@app/data'

export interface FirstLayerDiskReturn {
	files: File[]
	folders: Folder[]
}

const api = axios.create({
	baseURL: `${domenApi}/api/user`,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
})

const FirstLayerDisk = async (): Promise<FirstLayerDiskReturn> => {
	try {
		const response: AxiosResponse<FirstLayerDiskReturn> = await api.get(
			'/first-layer-disk'
		)

		console.table(response.data)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return { files: [], folders: [] }
	}
}

export default FirstLayerDisk
