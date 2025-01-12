import { File } from '@app/data.ts'

const SortFilesByName = (data: File[]): File[] => {
	return data.sort((a, b) => {
		if (a.name.toLowerCase() < b.name.toLowerCase()) {
			return -1
		} else if (a.name.toLowerCase() > b.name.toLowerCase()) {
			return 1
		}
		return 0
	})
}

export default SortFilesByName
