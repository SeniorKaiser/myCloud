import { domenApi } from '@app/data'

const downloadFile = async (id: string) => {
	try {
		const link = document.createElement('a')
		link.href = `${domenApi}/api/files/download/${id}`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	} catch (error) {
		console.error(error)
	}
}

export default downloadFile
