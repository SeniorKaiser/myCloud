const formatFileSize = (bits: number): string => {
	const units = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb']
	let size = bits,
		i = 0

	while (size >= 1024 && i < units.length - 1) {
		size /= 1024
		i++
	}

	return `${size.toFixed(2)} ${units[i]}`
}

export default formatFileSize
