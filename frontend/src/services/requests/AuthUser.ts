import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { User } from '@app/data'

const AuthUser = async (): Promise<User | undefined> => {
	try {
		const response: AxiosResponse = await axios.get(
			`${domenApi}/api/user/auth`,
			{ withCredentials: true }
		)
		console.table(response.data)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return undefined
	}
}

export default AuthUser
