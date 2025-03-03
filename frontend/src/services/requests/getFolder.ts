import axios from 'axios'
import { domenApi } from '@app/data'
import { Folder } from '@app/data'

const getFolder = async (folderId: string): Promise<Folder> => {
	try {
		const response = await axios.get(`${domenApi}/api/folder/get/${folderId}`)
		return response.data
	} catch (error) {
		console.error('Error fetching folder:', error)
		throw error
	}
}

export default getFolder
