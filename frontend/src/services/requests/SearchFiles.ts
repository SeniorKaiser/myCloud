import axios from 'axios'
import { domenApi } from '@app/data'

const SearchFiles = async (param: string) => {
	try {
		const response = await axios.get(
			`${domenApi}/api/user/disk-search/${encodeURIComponent(param)}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при поиске на диске:', error)
		throw error
	}
}

export default SearchFiles
