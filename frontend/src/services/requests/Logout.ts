import axios, { AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { toast } from 'react-hot-toast'

const logoutRequest = async (): Promise<undefined> => {
	const loadingToast = toast.loading('Authentication...')
	try {
		await axios.delete(`${domenApi}/api/user/logout`, {
			withCredentials: true,
		})
		toast.success(`Вы вышли из аккаунта`, { id: loadingToast })
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		toast.error('Пользователь не найден', { id: loadingToast })
		return undefined
	}
}

export default logoutRequest
