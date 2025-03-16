import React, { useState } from 'react'
import ContextMenu from '@components/ContextMenu/ContextMenu'
import { ContextMenuState, Option } from '@components/ContextMenu/Data'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
} from './Data'
import { File, Folder } from '@app/data'
import './FileTiles.css'
import copyToClipboard from '@services/functions/copyToClipboard'
import Modal from '@components/Modal/Modal'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import { EllipsisVertical } from '@components/Icons/Icons'
import { getFileIcon } from '@components/Icons/IconsReact'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	onSuccess?: (folder_id?: string) => Promise<void> | void
}

interface ModalProps {
	options: Option[]
}

const FileTiles: React.FC<StorageProps> = ({ files, folders, onSuccess }) => {
	const [contextMenu, setContextMenu] = useState<ContextMenuState>({
		visible: false,
		position: { position: 'static' },
		options: [],
	})
	const [object, setObject] = useState<File | Folder>()
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [modal, setModal] = useState<ModalProps>({
		options: [],
	})

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

	const handleModal = (item: File | Folder): void => {
		setModal({
			options: 'size' in item ? FileOption : FolderOption,
		})
		setModalActive(true)
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
						className='tile'
					>
						<div className='file-icon'>
							{'extension' in item
								? getFileIcon(item.extension)
								: getFileIcon('folder')}
						</div>
						<span>{item.name}</span>
						<div onClick={() => handleModal(item)}>
							<EllipsisVertical />
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
			{object && (
				<Modal active={modalActive} setActive={setModalActive}>
					<div className='modal_tile'>
						<div className='modal_tile-head'>
							<div className='file-icon'>
								{'extension' in object
									? getFileIcon(object.extension)
									: getFileIcon('folder')}
							</div>
							<div className='modal_tile-head_info'>
								<span>Имя: {object.name}</span>
								<span>ID: {object.id}</span>
								{'extension' in object && (
									<span>Размер: {formatFileSize(object.size)}</span>
								)}
								<span>Дата: {formatDate(object.date)}</span>
							</div>
						</div>
						<ul className='modal_tile_actions'>
							{modal.options.map((option, index) => (
								<li
									key={index}
									onClick={async () => {
										await option.action(object?.id)
										if (onSuccess) {
											await onSuccess(object?.parent_folder)
										}
									}}
								>
									<span>
										<option.icon />
									</span>
									{option.title}
								</li>
							))}
						</ul>
					</div>
				</Modal>
			)}
		</>
	)
}

export default FileTiles
