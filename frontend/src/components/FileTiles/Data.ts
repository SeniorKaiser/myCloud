export const isImage = (extension: string | undefined): boolean => {
	if (!extension) return false
	return imageExtensions.includes(extension.toLowerCase())
}

export const imageExtensions: string[] = [
	'jpg',
	'jpeg',
	'png',
	'gif',
	'bmp',
	'webp',
	'svg',
	'tiff',
	'ico',
	'heic',
	'avif',
]
