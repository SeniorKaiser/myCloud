import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'

const FirstLayerDisk = async () => {
	try {
		const response: AxiosResponse = await axios.get(
			`${domenApi}/api/user/first-layer-disk`
		)

		console.table('Disk', response.data)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return undefined
	}
}

export default FirstLayerDisk
