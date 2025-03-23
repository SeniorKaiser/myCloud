import { FC, useState } from 'react'
import { Columns } from './Data'
import { File, Folder, isFile, isFolder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './FileTable.css'
import { getFileIcon } from '@components/Icons/IconsReact'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	toFolder: (folder_id: string) => void
	setObject: (object: File | Folder) => void
	onOpenContextMenu: (event: React.MouseEvent, item: File | Folder) => void
	onModal: (item: File | Folder) => void
}

const FileTable: FC<StorageProps> = ({
	files,
	folders,
	toFolder,
	setObject,
	onOpenContextMenu,
	onModal,
}) => {
	const [focusedId, setFocusedId] = useState<string | null>(null)

	const handleFocus = (id: string) => {
		setFocusedId(id)
	}

	return (
		<>
			<table className='storage-table'>
				<thead>
					<tr>
						{Columns.map(({ title }) => (
							<th key={title}>{title}</th>
						))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{[...folders, ...files].map(item => (
						<tr
							key={item.id}
							className={`row ${focusedId === item.id ? 'focus' : ''}`}
							onContextMenu={event => {
								onOpenContextMenu(event, item)
							}}
							onDoubleClick={async () => {
								if (isFolder(item)) await toFolder(item.id)
							}}
							onClick={() => {
								setObject(item)
								handleFocus(item.id)
							}}
							style={isFolder(item) ? { cursor: 'pointer' } : undefined}
						>
							<td>
								<div className='file-head'>
									<span className='file-icon'>
										{isFile(item)
											? getFileIcon(item.extension)
											: getFileIcon('folder')}
									</span>
									<span className='file-name'>{item.name}</span>
								</div>
							</td>
							<td>{isFile(item) ? item.extension : 'папка'}</td>
							<td>{isFile(item) ? formatFileSize(item.size) : '-'}</td>
							<td>{formatDate(item.date)}</td>
							<td>
								<div onClick={() => onModal(item)}>
									<EllipsisVertical />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default FileTable
