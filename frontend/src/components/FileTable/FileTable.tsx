import React, { useState } from 'react'
import ContextMenu from '@components/ContextMenu/ContextMenu'
import { ContextMenuState } from '@components/ContextMenu/Data'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
	Columns,
} from './Data'
import { File, Folder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './FileTable.css'
import copyToClipboard from '@services/functions/copyToClipboard'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	onSuccess?: (folder_id?: string) => Promise<void> | void
}

const FileTable: React.FC<StorageProps> = ({ files, folders, onSuccess }) => {
	const [contextMenu, setContextMenu] = useState<ContextMenuState>({
		visible: false,
		position: { position: 'static' },
		options: [],
	})
	const [object, setObject] = useState<File | Folder>()

	const handleContextMenu = (
		event: React.MouseEvent,
		item: File | Folder
	): void => {
		event.preventDefault()
		setContextMenu({
			visible: true,
			position: {
				position: 'fixed',
				top: `${event.clientY}px`,
				left: `${event.clientX}px`,
			},
			options: 'size' in item ? FileOption : FolderOption,
		})
		setObject(item)
	}

	const handleContextMenuOptions = (
		event: React.MouseEvent,
		item: File | Folder
	): void => {
		event.preventDefault()
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
		setContextMenu({
			visible: true,
			position: {
				position: 'fixed',
				top: `${Math.min(event.clientY, window.innerHeight)}px`,
				right: `${Math.min(event.clientX, window.innerWidth - rect.left)}px`,
			},
			options: 'size' in item ? FileOption : FolderOption,
		})
		setObject(item)
	}

	const handleCloseMenu = (): void =>
		setContextMenu({
			visible: false,
			position: { position: 'fixed' },
			options: [],
		})

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
							onContextMenu={event => handleContextMenu(event, item)}
							onDoubleClick={async () => {
								if (!('extension' in item) && onSuccess) {
									await onSuccess(item.id)
								}
							}}
						>
							<td>
								<div style={{ display: 'inline-flex', width: '100%' }}>
									<img
										src={`/FilesIcons/${
											'extension' in item ? item.extension : 'folder'
										}.png`}
									/>
									<span>{item.name}</span>
								</div>
							</td>
							<td>{'extension' in item ? item.extension : 'папка'}</td>
							<td>{'extension' in item ? formatFileSize(item.size) : '-'}</td>
							<td>{formatDate(item.date)}</td>
							<td onClick={event => handleContextMenuOptions(event, item)}>
								<EllipsisVertical />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{contextMenu.visible && object && (
				<ContextMenu
					position={contextMenu.position}
					onClose={handleCloseMenu}
					options={contextMenu.options}
					onSuccess={onSuccess}
					object={object}
				>
					<h2 onClick={() => copyToClipboard(object?.name)}>{object?.name}</h2>
					<p onClick={() => copyToClipboard(object?.id)}>{object?.id}</p>
				</ContextMenu>
			)}
		</>
	)
}

export default FileTable
