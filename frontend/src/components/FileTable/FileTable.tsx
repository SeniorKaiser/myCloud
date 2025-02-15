import React, { useState, useRef } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu'
import { FileOptionsContextMenu, Columns } from './Data'
import { File, Folder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import './FileTable.css'

export interface StorageProps {
	files: File[]
	folders: Folder[]
}

const FileTable: React.FC<StorageProps> = ({ files, folders }) => {
	const contextButtonRef = useRef<HTMLTableCellElement>(null)
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})
	const [contextMenuTitle, setContextMenuTitle] = useState<string | undefined>(
		undefined
	)
	const [contextMenuObjectId, setContextMenuObjectId] = useState<
		string | undefined
	>(undefined)

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		const target = event.currentTarget as HTMLElement
		setContextMenuTitle(target.getAttribute('data-name') || undefined)
		setContextMenuObjectId(target.getAttribute('data-id') || undefined)
		setMenuPosition({
			top: `${event.clientY}px`,
			left: `${event.clientX}px`,
		})
		setContextMenuVisible(true)
	}
	const handleContextMenuOptions = (event: React.MouseEvent): void => {
		event.preventDefault()
		const target = event.currentTarget as HTMLElement
		const rect = target.getBoundingClientRect()
		const fixedX = Math.min(event.clientX, window.innerWidth - rect.left)
		const fixedY = Math.min(event.clientY, window.innerHeight)
		setMenuPosition({
			top: `${fixedY}px`,
			right: `${fixedX}px`,
		})
		setContextMenuTitle(target.getAttribute('data-name') || undefined)
		setContextMenuObjectId(target.getAttribute('data-id') || undefined)
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
	}

	return (
		<>
			<table className='storage-table'>
				<thead>
					<tr>
						{Columns.map(column => (
							<th key={column.title} className={column.title}>
								{column.title}
							</th>
						))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{files.map(file => (
						<tr
							key={file.id}
							onContextMenu={handleContextMenu}
							data-name={file.name}
							data-id={file.id}
						>
							<td>
								<div style={{ display: 'inline-flex' }}>
									<img
										src={
											'FilesIcons/' +
											(file.extension ? file.extension : 'folder') +
											'.png'
										}
										alt={file.extension ? file.extension : 'folder'}
									/>
									<span>{file.name}</span>
								</div>
							</td>
							<td>{file.extension ? file.extension : 'folder'}</td>
							<td>{file.size ? file.size : '-'}</td>
							<td>{file.date ? file.date : '-'}</td>
							<td
								ref={contextButtonRef}
								onClick={handleContextMenuOptions}
								data-name={file.name}
								data-id={file.id}
							>
								<EllipsisVertical />
							</td>
						</tr>
					))}
					{folders.map(folder => (
						<tr
							key={folder.id}
							onContextMenu={handleContextMenu}
							data-name={folder.name}
							data-id={folder.id}
						>
							<td>
								<div>
									<img src={'FilesIcons/' + 'folder' + '.png'} alt='folder' />
									<span>{folder.name}</span>
								</div>
							</td>
							<td>folder</td>
							<td>-</td>
							<td>-</td>
							<td
								ref={contextButtonRef}
								onClick={handleContextMenuOptions}
								data-name={folder.name}
								data-id={folder.id}
							>
								<EllipsisVertical />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{contextMenuVisible && (
				<ContextMenu
					options={FileOptionsContextMenu}
					position={menuPosition}
					onClose={handleCloseMenu}
					title={contextMenuTitle}
					objectId={contextMenuObjectId}
				/>
			)}
		</>
	)
}

export default FileTable
