import axios from 'axios'
import { domenApi } from '@app/data'

const deleteFile = async (id: string) => {
	try {
		const response = await axios.delete(`${domenApi}/api/delete/${id}`)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export default deleteFile
