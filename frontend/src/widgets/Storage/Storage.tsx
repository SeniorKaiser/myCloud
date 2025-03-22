import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import FileTiles from '@components/FileTiles/FileTiles.tsx'
// import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
import uploadFile from '@services/requests/Upload'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'
import {
	ChevronLeft,
	Download as UploadIcon,
	Grip,
	GripLines,
} from '@components/Icons/Icons'
import getFolder from '@services/requests/getFolder'
import Modal from '@components/Modal/Modal'
import Switcher from '@components/Switcher/Switcher'
import { Folder, File } from '@app/data'
import { ContextMenuState } from '@components/ContextMenu/Data'
import ContextMenu from '@components/ContextMenu/ContextMenu'
import copyToClipboard from '@services/functions/copyToClipboard'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
} from './Data'
import ListOptions from '@components/ListOptions/ListOptions'
import { tempfile, tempfolder } from '@app/data'
// import { getFileIcon } from '@components/Icons/IconsReact'
// import formatDate from '@services/functions/formatDate'
// import formatFileSize from '@services/functions/formatSize'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)
	const [modalDragAndDropActive, setModalDragAndDropActive] =
		useState<boolean>(false)
	const [modalFileActive, setModalFileActive] = useState<boolean>(false)
	const [displayStyle, setDisplayStyle] = useState<Boolean>(false)
	const [object, setObject] = useState<File | Folder>(tempfile)
	const [currentFolder, setCurrentFolder] = useState<Folder>(tempfolder)
	const [contextMenu, setContextMenu] = useState<ContextMenuState>({
		visible: false,
		position: { position: 'static' },
		options: [],
	})

	// const fetchData = async (item: File | Folder) => {
	// 	let folderId = currentFolder?.id
	// 	if (fid) {
	// 		const [curFolder, response] = await Promise.all([
	// 			getFolder(item?.parent_folder),
	// 			Disk(fid),
	// 		])
	// 		if (curFolder.id !== currentFolder?.id) {
	// 			setCurrentFolder(curFolder)
	// 		}
	// 		setData(response)
	// 		console.timeEnd()
	// 		return
	// 	}
	// 	if (fid === null) {
	// 		folderId = undefined
	// 		setCurrentFolder(undefined)
	// 	}
	// 	const response = await Disk(folderId)
	// 	setData(response)
	// }

	const fetchData = async (item: Folder) => {
		setObject(item)

		console.log('Выбранный объект:', item)

		let curFolder, response
		if (item.parent_folder) {
			;[curFolder, response] = await Promise.all([
				getFolder(item.parent_folder),
				Disk(item.parent_folder),
			])
		} else {
			;[curFolder, response] = await Promise.all([item, Disk()])
		}

		setData(response)
		setCurrentFolder(curFolder)
		console.log(data, currentFolder)
	}

	useEffect(() => {
		fetchData(currentFolder)
	}, [])

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (e.dataTransfer.types.includes('Files')) {
			setModalDragAndDropActive(true)
		}
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setModalDragAndDropActive(false)
		const files = Array.from(e.dataTransfer.files)
		if (files.length === 0) return
		await Promise.all(files.map(file => uploadFile(file, currentFolder?.id)))
		await fetchData(currentFolder)
	}

	const handleOpenContextMenu = (
		event: React.MouseEvent,
		item: File | Folder
	): void => {
		event.preventDefault()
		setObject(item)
		setContextMenu({
			visible: true,
			position: {
				position: 'fixed',
				top: `${event.clientY}px`,
				left: `${event.clientX}px`,
			},
			options: item ? ('size' in item ? FileOption : FolderOption) : [],
		})
	}

	const handleCloseContextMenu = (): void =>
		setContextMenu({
			visible: false,
			position: { position: 'fixed' },
			options: [],
		})

	const handleOpenFileModal = (item: File | Folder): void => {
		setObject(item)
		setModalFileActive(true)
	}

	return (
		<section
			className='storage'
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			{/* <SearchInput placeholder='Введите название' /> */}
			<div className='storage-functions'>
				<button
					onClick={async () => {
						await fetchData(currentFolder)
					}}
					className='storage__prev'
					style={currentFolder ? {} : { display: 'none' }}
				>
					{currentFolder != tempfolder && <ChevronLeft />}
					<span>{currentFolder?.name}</span>
				</button>
				<Switcher
					setActive={setDisplayStyle}
					childrenLeft={<Grip />}
					childrenRight={<GripLines />}
				/>
				<CreateFolderButton
					folder_id={currentFolder?.id}
					onSuccess={async () => await fetchData(currentFolder)}
				/>
				<Upload
					folder_id={currentFolder?.id}
					onSuccess={async () => await fetchData(currentFolder)}
				/>
			</div>
			{data ? (
				displayStyle ? (
					<FileTiles
						files={data.files}
						folders={data.folders}
						onSuccess={fetchData}
						setObject={setObject}
						onOpenContextMenu={handleOpenContextMenu}
						onModal={handleOpenFileModal}
					/>
				) : (
					<FileTable
						files={data.files}
						folders={data.folders}
						onSuccess={fetchData}
						setObject={setObject}
						onOpenContextMenu={handleOpenContextMenu}
						onModal={handleOpenFileModal}
					/>
				)
			) : (
				<div className='storage-loader'>
					<Loader />
				</div>
			)}
			<Modal
				active={modalDragAndDropActive}
				setActive={setModalDragAndDropActive}
			>
				<div className='drag-and-drop-modal'>
					<div className='drag-and-drop-modal__icon'>
						<UploadIcon />
					</div>
					<div className='drag-and-drop-modal__text'>Загрузить</div>
				</div>
			</Modal>
			{contextMenu.visible && object && (
				<ContextMenu
					position={contextMenu.position}
					onClose={handleCloseContextMenu}
					options={contextMenu.options}
					onSuccess={fetchData}
					object={object}
				>
					<h2 onClick={() => copyToClipboard(object?.name)}>{object?.name}</h2>
					<p onClick={() => copyToClipboard(object?.id)}>{object?.id}</p>
				</ContextMenu>
			)}
			<Modal active={modalFileActive} setActive={setModalFileActive}>
				<div className='modal_tile'>
					{/* <div className='modal_tile-head'>
						<div className='file-icon'>
							{'extension' in object
								? getFileIcon(object.extension)
								: getFileIcon('folder')}
						</div>
						<div className='modal_tile-head_info'>
							<div>
								<span>Имя:</span> {object.name}
							</div>
							<div>
								<span>Дата:</span> {formatDate(object.date)}
							</div>

							{'extension' in object && (
								<>
									<div>
										<span>Размер:</span> {formatFileSize(object.size)}
									</div>
									<div>
										<span>Расширение:</span> {object.extension}
									</div>
								</>
							)}
						</div>
					</div> */}
					<ul className='modal_tile_actions'>
						{object && (
							<ListOptions
								options={contextMenu.options}
								object={object}
								onSuccess={fetchData}
							/>
						)}
					</ul>
				</div>
			</Modal>
		</section>
	)
}

export default Storage
