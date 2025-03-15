import React, { useState } from 'react'
import ContextMenu from '@components/ContextMenu/ContextMenu'
import { ContextMenuState, Option } from '@components/ContextMenu/Data'
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
import Modal from '@components/Modal/Modal'

export interface StorageProps {
	files: File[]
	folders: Folder[]
	onSuccess?: (folder_id?: string) => Promise<void> | void
}

interface ModalProps {
	options: Option[]
}

const FileTable: React.FC<StorageProps> = ({ files, folders, onSuccess }) => {
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
							<td>
								<div onClick={() => handleModal(item)}>
									<EllipsisVertical />
								</div>
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
			{object && (
				<Modal active={modalActive} setActive={setModalActive}>
					<div className='modal_tile'>
						<div className='modal_tile-head'>
							{'extension' in object ? (
								<img src={`/FilesIcons/${object.extension}.png`} />
							) : (
								<img src={`/FilesIcons/folder.png`} />
							)}
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

export default FileTable
