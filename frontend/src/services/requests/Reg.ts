import axios, { AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'

interface RegProps {
	username: string
	email: string
	password: string
}

const RegRequest = async ({
	username,
	email,
	password,
}: RegProps): Promise<string | undefined> => {
	try {
		const formData = {
			name: username,
			email: email,
			password: password,
		}

		const response = await axios.post(`${domenApi}/api/user/reg`, formData, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		})

		console.log('Response:', response.data)
		return response.data.access_token
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		return undefined
	}
}

export default RegRequest
