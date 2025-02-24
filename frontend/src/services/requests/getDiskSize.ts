import axios from 'axios'
import { domenApi } from '@app/data'

const getDiskSize = async () => {
	try {
		const response = await axios.get(`${domenApi}/api/user/disk-size`, {
			withCredentials: true,
		})
		console.log('Размер диска:', response.data)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении размера диска:', error)
		return 1
	}
}

export default getDiskSize
