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
import uploadFile from '@services/requests/Upload'
import './FileTable.css'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	folder_id?: string | undefined
}

const FileTable: React.FC<StorageProps> = ({ files, folders, folder_id }) => {
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

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const files = Array.from(e.dataTransfer.files)
		if (files.length === 0) return
		await Promise.all(files.map(file => uploadFile(file, folder_id)))
		window.location.reload()
	}

	const handleCloseMenu = (): void =>
		setContextMenu({ visible: false, position: {} })

	return (
		<>
			<table
				className='storage-table'
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
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
							onDoubleClick={() =>
								item.type === 'folder' &&
								(window.location.href = `/disk/${item.id}`)
							}
							data-name={item.name}
							data-id={item.id}
						>
							<td>
								<div style={{ display: 'inline-flex', width: '100%' }}>
									<img
										src={`/FilesIcons/${
											item.type === 'file' ? item.extension : 'folder'
										}.png`}
										alt={item.name}
									/>
									<span>{item.name}</span>
								</div>
							</td>
							<td>{item.type === 'file' ? item.extension : 'folder'}</td>
							<td>{item.type === 'file' ? formatFileSize(item.size) : '-'}</td>
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
				/>
			)}
		</>
	)
}

export default FileTable
