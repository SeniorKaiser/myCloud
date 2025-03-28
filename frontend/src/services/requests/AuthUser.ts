import axios, { AxiosResponse } from 'axios'
import { domenApi } from '@app/data.ts'
import { User } from '@app/data'

const AuthUser = async (): Promise<User | undefined> => {
	try {
		const response: AxiosResponse = await axios.get(
			`${domenApi}/api/user/auth`,
			{ withCredentials: true }
		)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export default AuthUser
