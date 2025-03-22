import { FC } from 'react'
import { Columns } from './Data'
import { File, Folder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './FileTable.css'
import { getFileIcon } from '@components/Icons/IconsReact'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	toFolder: (item: Folder) => void
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
							onContextMenu={event => {
								setObject(item)
								onOpenContextMenu(event, item)
							}}
							onDoubleClick={async () => {
								if (!('extension' in item)) await toFolder(item)
							}}
						>
							<td>
								<div className='file-head'>
									<span className='file-icon'>
										{'extension' in item
											? getFileIcon(item.extension)
											: getFileIcon('folder')}
									</span>
									<span className='file-name'>{item.name}</span>
								</div>
							</td>
							<td>{'extension' in item ? item.extension : 'папка'}</td>
							<td>{'extension' in item ? formatFileSize(item.size) : '-'}</td>
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
