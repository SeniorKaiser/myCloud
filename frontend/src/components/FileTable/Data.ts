import { Upload, KeyBoard, TrashCan } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'
import downloadFile from '@services/requests/Download'
import deleteFile from '@services/requests/Delete'

export const FileOptionsContextMenu: Option[] = [
	{
		title: 'Download',
		action: async (id?: string) => {
			if (id) await downloadFile(id)
		},
		icon: Upload,
	},
	{ title: 'Rename', action: () => alert('Rename'), icon: KeyBoard },
	{
		title: 'Delete',
		action: async (id?: string) => {
			if (id) await deleteFile(id)
		},
		icon: TrashCan,
	},
]

export const FolderOptionsContextMenu: Option[] = [
	{ title: 'Rename', action: () => alert('Rename'), icon: KeyBoard },
	{
		title: 'Delete',
		action: async (id?: string) => {
			if (id) await deleteFile(id)
		},
		icon: TrashCan,
	},
]

export const TableContextMenu: Option[] = [
	{
		title: 'Create Folder',
		action: async (id?: string) => {
			if (id) await downloadFile(id)
		},
		icon: Upload,
	},
	{ title: 'Rename', action: () => alert('Rename'), icon: KeyBoard },
]

export const Columns = [
	{ title: 'Name' },
	{ title: 'Extension' },
	{ title: 'Size' },
	{ title: 'Date' },
]
