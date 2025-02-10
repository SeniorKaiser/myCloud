import { Upload, KeyBoard, TrashCan } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'

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
