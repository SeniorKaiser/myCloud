import { Upload, KeyBoard, TrashCan } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ListOptions/Data'
import downloadFile from '@services/requests/Download'
import deleteFile from '@services/requests/Delete'
import renameFolder from '@services/requests/RenameFolder'
import renameFile from '@services/requests/Rename'
import deleteFolder from '@services/requests/DeleteFolder'
import customPrompt from '@components/CustomPrompt/PromptHelper'

export const FileOptionsContextMenu: Option[] = [
	{
		title: 'Скачать',
		action: async (id?: string) => {
			if (id) await downloadFile(id)
		},
		icon: Upload,
	},
	{
		title: 'Переименовать',
		action: async (id?: string) => {
			const folderName = await customPrompt('Имя файла')
			if (folderName && id) await renameFile(id, folderName)
		},
		icon: KeyBoard,
	},
	{
		title: 'Удалить',
		action: async (id?: string) => {
			if (id) await deleteFile(id)
		},
		icon: TrashCan,
	},
]

export const FolderOptionsContextMenu: Option[] = [
	{
		title: 'Переименовать',
		action: async (id?: string) => {
			const folderName = await customPrompt('Имя папки')
			if (folderName && id) await renameFolder(id, folderName)
		},
		icon: KeyBoard,
	},
	{
		title: 'Удалить',
		action: async (id?: string) => {
			if (id) await deleteFolder(id)
		},
		icon: TrashCan,
	},
]

export interface ModalProps {
	active: boolean
	options: Option[]
}
