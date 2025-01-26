import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'

const AuthUser = async (): Promise<string | undefined> => {
	try {
		const response: AxiosResponse = await axios.post(
			`${domenApi}/api/user/auth`,
			{ withCredentials: true }
		)
		console.log('User:', response.data)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return undefined
	}
}

export default AuthUser
