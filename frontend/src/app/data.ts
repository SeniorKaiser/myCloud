import * as Icons from '@components/Icons/Icons.tsx'

export const title: string = 'myCloud'

export const domenApi: string = 'http://79.141.77.164'

export interface Option {
	title: string
	action: () => void
	icon: React.FC
}

export const ProfileOptionsContextMenu: Option[] = [
	{
		title: 'Disk',
		action: () => (window.location.href = '/disk'),
		icon: Icons.HardDrive,
	},
	{ title: 'Friends', action: () => alert('Friends'), icon: Icons.User },
	{
		title: 'Settings',
		action: () => (window.location.href = '/settings'),
		icon: Icons.Sliders,
	},
	{
		title: 'Change Account',
		action: () => (window.location.href = '/login'),
		icon: Icons.ArrowRightFromBracket,
	},
]

export const FileOptionsContextMenu: Option[] = [
	{
		title: 'Download',
		action: () => alert('Download'),
		icon: Icons.Upload,
	},
	{ title: 'Rename', action: () => alert('Rename'), icon: Icons.KeyBoard },
	{ title: 'Delete', action: () => alert('Delete'), icon: Icons.TrashCan },
]

export const Columns = [
	{ title: 'Name' },
	{ title: 'Extension' },
	{ title: 'Size' },
	{ title: 'Date' },
]

export interface File {
	id: string
	name: string
	extension: string
	size: number
	date: string
}

export const TempFilesList: File[] = [
	{
		id: '8273yufh1',
		name: 'Logo',
		extension: 'png',
		size: 53623,
		date: '27.12.2024',
	},
	{
		id: '8273yufh2',
		name: 'Logo',
		extension: 'png',
		size: 53623,
		date: '27.12.2024',
	},
	{
		id: '8273yufh3',
		name: 'Logo',
		extension: 'png',
		size: 53623,
		date: '27.12.2024',
	},
]
