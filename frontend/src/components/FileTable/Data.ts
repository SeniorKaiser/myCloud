import { Upload, KeyBoard, TrashCan } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'
import downloadFile from '@services/requests/Download'
import deleteFile from '@services/requests/Delete'
import renameFolder from '@services/requests/RenameFolder'
import renameFile from '@services/requests/Rename'
import deleteFolder from '@services/requests/DeleteFolder'
import customPrompt from '@components/CustomPrompt/PromptHelper'

export const FileOptionsContextMenu: Option[] = [
	{
		title: 'Download',
		action: async (id?: string) => {
			if (id) await downloadFile(id)
		},
		icon: Upload,
	},
	{
		title: 'Rename',
		action: async (id?: string) => {
			const folderName = await customPrompt('File name')
			if (folderName && id) await renameFile(id, folderName)
		},
		icon: KeyBoard,
	},
	{
		title: 'Delete',
		action: async (id?: string) => {
			if (id) await deleteFile(id)
		},
		icon: TrashCan,
	},
]

export const FolderOptionsContextMenu: Option[] = [
	{
		title: 'Rename',
		action: async (id?: string) => {
			const folderName = await customPrompt('Folder name')
			if (folderName && id) await renameFolder(id, folderName)
		},
		icon: KeyBoard,
	},
	{
		title: 'Delete',
		action: async (id?: string) => {
			if (id) await deleteFolder(id)
		},
		icon: TrashCan,
	},
]

export const Columns = [
	{ title: 'Name' },
	{ title: 'Extension' },
	{ title: 'Size' },
	{ title: 'Date' },
]
