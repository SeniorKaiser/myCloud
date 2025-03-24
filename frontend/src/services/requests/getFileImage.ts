import axios from 'axios'
import { domenApi } from '@app/data'

async function getImage(id: string) {
	try {
		const response = await axios.get(`${domenApi}/api/files/get-image/${id}`, {
			responseType: 'blob',
		})

		const blob = new Blob([response.data], {
			type: response.headers['content-type'],
		})
		const imageUrl = URL.createObjectURL(blob)
		return imageUrl
	} catch (error) {
		console.error('Error fetching image:', error)
	}
}

export default getImage
