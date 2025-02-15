export const formatDate = (isoString: string): string => {
	const date = new Date(isoString)
	return date.toLocaleString('eu-EU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}

export default formatDate
