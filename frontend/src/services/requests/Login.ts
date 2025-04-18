import axios, { AxiosResponse, AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { toast } from 'react-hot-toast'

interface LoginProps {
	username: string
	password: string
}

const loginRequest = async ({
	username,
	password,
}: LoginProps): Promise<string | undefined> => {
	const loadingToast = toast.loading('Поиск пользователя...')
	try {
		const formData = new URLSearchParams()
		formData.append('username', username)
		formData.append('password', password)

		const response: AxiosResponse<{ access_token: string }> = await axios.post(
			`${domenApi}/api/user/login`,
			formData,
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				withCredentials: true,
			}
		)
		toast.success(`Пользователь найден`, { id: loadingToast })
		console.log('Токен:', response.data)
		return response.data.access_token
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		toast.error('Ошибка! Пользователь не найден', { id: loadingToast })
		return undefined
	}
}

export default loginRequest
