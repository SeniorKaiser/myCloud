import React, { useState } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu'
import {
	FileOptionsContextMenu,
	FolderOptionsContextMenu,
	Columns,
} from './Data'
import { File, Folder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './FileTable.css'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	folder_id?: string | undefined
	onSuccess?: (folder_id?: string) => Promise<void> | void
}

const FileTable: React.FC<StorageProps> = ({ files, folders, onSuccess }) => {
	const [contextMenu, setContextMenu] = useState<{
		visible: boolean
		position: Position
		title?: string
		objectId?: string
		options?: any
	}>({
		visible: false,
		position: {},
	})

	const handleContextMenu = (
		event: React.MouseEvent,
		item: File | Folder
	): void => {
		event.preventDefault()
		setContextMenu({
			visible: true,
			position: { top: `${event.clientY}px`, left: `${event.clientX}px` },
			title: item.name,
			objectId: item.id,
			options:
				'size' in item ? FileOptionsContextMenu : FolderOptionsContextMenu,
		})
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
				top: `${Math.min(event.clientY, window.innerHeight)}px`,
				right: `${Math.min(event.clientX, window.innerWidth - rect.left)}px`,
			},
			title: item.name,
			objectId: item.id,
			options:
				'size' in item ? FileOptionsContextMenu : FolderOptionsContextMenu,
		})
	}

	const handleCloseMenu = (): void =>
		setContextMenu({ visible: false, position: {} })

	return (
		<>
			<table className='storage-table'>
				<thead>
					<tr>
						{Columns.map(({ title }) => (
							<th key={title} className={title}>
								{title}
							</th>
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
								if (onSuccess) {
									await onSuccess(item.id)
								}
							}}
							data-name={item.name}
							data-id={item.id}
							style={{ cursor: 'extension' in item ? 'default' : 'pointer' }}
						>
							<td>
								<div style={{ display: 'inline-flex', width: '100%' }}>
									<img
										src={`/FilesIcons/${
											'extension' in item ? item.extension : 'folder'
										}.png`}
										alt={item.name}
									/>
									<span>{item.name}</span>
								</div>
							</td>
							<td>{'extension' in item ? item.extension : 'folder'}</td>
							<td>{'extension' in item ? formatFileSize(item.size) : '-'}</td>
							<td>{formatDate(item.date)}</td>
							<td onClick={event => handleContextMenuOptions(event, item)}>
								<EllipsisVertical />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{contextMenu.visible && (
				<ContextMenu
					options={contextMenu.options}
					position={contextMenu.position}
					onClose={handleCloseMenu}
					title={contextMenu.title}
					objectId={contextMenu.objectId}
					onSuccess={onSuccess}
				/>
			)}
		</>
	)
}

export default FileTable
