import { Upload, KeyBoard, TrashCan } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'
import { File } from '@app/data'

export const FileOptionsContextMenu: Option[] = [
	{
		title: 'Download',
		action: () => alert('Download'),
		icon: Upload,
	},
	{ title: 'Rename', action: () => alert('Rename'), icon: KeyBoard },
	{ title: 'Delete', action: () => alert('Delete'), icon: TrashCan },
]

export const Columns = [
	{ title: 'Name' },
	{ title: 'Extension' },
	{ title: 'Size' },
	{ title: 'Date' },
]

export const TempFilesList: File[] = [
	// {
	// 	id: '8273yufh1',
	// 	name: 'Folder',
	// 	extension: 'Folder',
	// 	size: 0,
	// 	date: '27.12.2024',
	// },
	// {
	// 	id: '8273yufh3',
	// 	name: 'Logo',
	// 	extension: 'png',
	// 	size: 53623,
	// 	date: '27.12.2024',
	// },
]
