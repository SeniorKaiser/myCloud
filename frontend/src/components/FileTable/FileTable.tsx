import React, { useState, useRef } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu'
import { FileOptionsContextMenu } from '@app/data'
import { File, Columns } from '@app/data.ts'
import { EllipsisVertical } from '@components/Icons/Icons'
import './FileTable.css'

interface StorageProps {
	files: File[]
}

const FileTable: React.FC<StorageProps> = ({ files }) => {
	const contextButtonRef = useRef<HTMLTableCellElement>(null)
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({
			top: `${event.clientY}px`,
			left: `${event.clientX}px`,
		})
		setContextMenuVisible(true)
	}
	const handleContextMenuOptions = (event: React.MouseEvent): void => {
		event.preventDefault()
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
		const fixedX = Math.min(event.clientX, window.innerWidth - rect.left)
		const fixedY = Math.min(event.clientY, window.innerHeight)
		setMenuPosition({
			top: `${fixedY}px`,
			right: `${fixedX}px`,
		})

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
						<tr key={file.id} onContextMenu={handleContextMenu}>
							<td>
								<div
									style={{ display: 'inline-flex', justifyContent: 'center' }}
								>
									<img
										src={
											'public/FilesIcons/' +
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
							<td ref={contextButtonRef} onClick={handleContextMenuOptions}>
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
				/>
			)}
		</>
	)
}

export default FileTable
