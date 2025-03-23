import React, { useState } from 'react'
import { isImage } from './Data'
import { File, Folder } from '@app/data'
import './FileTiles.css'
import formatFileSize from '@services/functions/formatSize'
import { EllipsisVertical } from '@components/Icons/Icons'
import { getFileIcon } from '@components/Icons/IconsReact'
import getImage from '@services/requests/getFileImage'

interface StorageProps {
	files: File[]
	folders: Folder[]
	toFolder: (folder_id: string) => void
	setObject: (object: File | Folder) => void
	onOpenContextMenu: (event: React.MouseEvent, item: File | Folder) => void
	onModal: (item: File | Folder) => void
}

const FileTiles: React.FC<StorageProps> = ({
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
			<div className='storage-tiles'>
				{[...folders, ...files].map(item => (
					<div
						key={item.id}
						onContextMenu={event => {
							setObject(item)
							onOpenContextMenu(event, item)
						}}
						onDoubleClick={async () => {
							if (!('extension' in item)) await toFolder(item.id)
						}}
						className={`tile ${focusedId === item.id ? 'focus' : ''}`}
						onClick={() => {
							setObject(item)
							handleFocus(item.id)
						}}
					>
						{'extension' in item ? (
							isImage(item.extension) ? (
								<img
									src={''}
									alt='file preview'
									className='tile-file-preview'
									loading='lazy'
									onLoad={e => {
										const img = e.currentTarget as HTMLImageElement
										getImage(item.id).then(url => {
											if (url) img.src = url
										})
									}}
								/>
							) : (
								<div className='file-icon'>{getFileIcon(item.extension)}</div>
							)
						) : (
							<div className='file-icon'>{getFileIcon('folder')}</div>
						)}

						<span>{item.name}</span>
						{'extension' in item && (
							<div className='tile_hover-info'>
								<span>{formatFileSize(item.size)}</span>
								<span>{item.extension}</span>
							</div>
						)}

						<div onClick={() => onModal(item)} className='tile_options'>
							<EllipsisVertical />
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default FileTiles
