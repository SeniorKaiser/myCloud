export const title: string = 'myCloud'

export const domenApi: string = 'http://79.141.77.164'

export interface File {
	id: string
	name: string
	extension: string
	size: number
	date: string
}

export interface Folder {
	id: string
	name: string
	date: string
	parent_folder: string | null
	files: File[]
	user_id: string
}

export interface User {
	id: string
	name: string
	email: string
	date: string
	files: File[]
	folder: Folder[]
}

export const tempfiles: File[] = [
	{
		id: 'bad3827c-d6c4-4c0a-b156-622d3ba03c50',
		name: 'sjdskjddhsjhjshshjhdjsahdsjahjsdhjsakjldhjashdjkasjdhsajsdsdsdsdsfkdsfjkl',
		date: '2025-02-10T15:08:23.957075',
		size: 1223,
		extension: 'png',
	},
]
