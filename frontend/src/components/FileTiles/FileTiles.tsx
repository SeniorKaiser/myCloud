import React, { useState } from 'react'
import ContextMenu from '@components/ContextMenu/ContextMenu'
import { ContextMenuState } from '@components/ContextMenu/Data'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
} from './Data'
import { File, Folder } from '@app/data'
import { EllipsisVertical } from '@components/Icons/Icons'
import './FileTiles.css'
import copyToClipboard from '@services/functions/copyToClipboard'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	onSuccess?: (folder_id?: string) => Promise<void> | void
}

const FileTiles: React.FC<StorageProps> = ({ files, folders, onSuccess }) => {
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
				left: `${Math.min(
					event.clientX,
					window.innerWidth - rect.left - 10
				)}px`,
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
			<div className='storage-tiles'>
				{[...folders, ...files].map(item => (
					<div
						key={item.id}
						onContextMenu={event => handleContextMenu(event, item)}
						onDoubleClick={async () => {
							if (!('extension' in item) && onSuccess) {
								await onSuccess(item.id)
							}
						}}
						className='storage-tiles_tile'
					>
						{'extension' in item ? (
							<img src={`/FilesIcons/${item.extension}.png`} />
						) : (
							<img src={`/FilesIcons/folder.png`} />
						)}
						<img></img>
						<div className='storage-tiles-info'>
							<span>{item.name}</span>
							<span onClick={event => handleContextMenuOptions(event, item)}>
								<EllipsisVertical />
							</span>
						</div>
					</div>
				))}
			</div>
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

export default FileTiles
