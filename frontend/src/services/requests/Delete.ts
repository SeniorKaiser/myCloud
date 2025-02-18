import axios from 'axios'
import { domenApi } from '@app/data'

const deleteFile = async (id: string) => {
	try {
		const response = await axios.delete(`${domenApi}/api/files/delete/${id}`)
		console.log(response.data)
		window.location.reload()
		return response.data
	} catch (error) {
		console.error(error)
	}
}

export default deleteFile
