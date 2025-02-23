import axios, { AxiosResponse } from 'axios'
import { domenApi } from '@app/data.ts'
import { User } from '@app/data'
import { toast } from 'react-hot-toast'

const AuthUser = async (): Promise<User | undefined> => {
	const loadingToast = toast.loading('Authentication...')
	try {
		const response: AxiosResponse = await axios.get(
			`${domenApi}/api/user/auth`,
			{ withCredentials: true }
		)
		console.table(response.data)
		toast.success(`User authenticated`, { id: loadingToast })
		return response.data
	} catch (error) {
		toast.error('Error! User was not found', { id: loadingToast })
		console.error(error)
	}
}

export default AuthUser
