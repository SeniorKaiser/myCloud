export const title: string = 'myCloud'

export const domenApi: string = 'http://79.141.77.164'

export interface File {
	id: string
	name: string
	extension: string
	size: number
	date: string
	parent_folder: string | undefined
}

export interface Folder {
	id: string
	name: string
	date: string
	parent_folder: string | undefined
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

export const tempfile: File = {
	id: '',
	name: '',
	date: '',
	size: 0,
	extension: '',
	parent_folder: undefined,
}

export const tempfolder: Folder = {
	id: '',
	name: '',
	date: '',
	parent_folder: undefined,
	user_id: '',
	files: [],
}
