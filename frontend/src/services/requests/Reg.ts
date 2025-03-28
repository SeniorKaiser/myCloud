import axios, { AxiosError } from 'axios'
import { domenApi } from '@app/data.ts'
import { toast } from 'react-hot-toast'

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
	const loadingToast = toast.loading('Регистарция...')
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

		toast.success(`Успешная регистарция`, { id: loadingToast })
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		console.error('Ошибка:', axiosError.response?.data || axiosError.message)
		toast.error('Ошибка регистрации', { id: loadingToast })
		return undefined
	}
}

export default RegRequest
