import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import FileTiles from '@components/FileTiles/FileTiles.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
import uploadFile from '@services/requests/Upload'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'
import {
	ChevronLeft,
	Download as UploadIcon,
	GripLines,
	Grip,
} from '@components/Icons/Icons'
import getFolder from '@services/requests/getFolder'
import Modal from '@components/Modal/Modal'
// import { tempfiles, tempfolders } from '@app/data'
import { Folder } from '@app/data'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [currentFolder, setCurrentFolder] = useState<Folder | undefined>(
		undefined
	)
	const [display, setDisplay] = useState<Boolean>(false)

	const fetchData = async (fid?: string) => {
		console.time('Disk')

		let folderId = currentFolder?.id

		// Параллельные запросы, если есть fid
		if (fid) {
			const [curFolder, response] = await Promise.all([
				getFolder(fid),
				Disk(fid),
			])
			if (curFolder.id !== currentFolder?.id) {
				setCurrentFolder(curFolder)
			}
			setData(response)
			console.timeEnd()
			return
		}

		// Если null, сбрасываем состояние
		if (fid === null) {
			folderId = undefined
			setCurrentFolder(undefined)
		}

		// Получаем данные, если нужно
		const response = await Disk(folderId)
		setData(response)
		console.timeEnd()
	}

	useEffect(() => {
		fetchData()
		if (localStorage.getItem('storage-display') == 'true') {
			setDisplay(true)
		} else {
			setDisplay(false)
		}
	}, [])

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setModalActive(true)
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setModalActive(false)
		const files = Array.from(e.dataTransfer.files)
		if (files.length === 0) return
		await Promise.all(files.map(file => uploadFile(file, currentFolder?.id)))
		await fetchData()
	}

	return (
		<section
			className='storage'
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<SearchInput placeholder='Найдётся всё' />
			<div className='storage-functions'>
				<button
					onClick={async () => {
						await fetchData(currentFolder?.parent_folder)
					}}
					className='storage__prev'
					style={currentFolder ? {} : { display: 'none' }}
				>
					{currentFolder && <ChevronLeft />}
					<span>{currentFolder?.name}</span>
				</button>
				<div className='switcher-showing-button'>
					<button
						className='showing-button_table'
						onClick={() => {
							setDisplay(false)
							localStorage.setItem('storage-display', 'false')
						}}
					>
						<GripLines />
					</button>
					<button
						className='showing-button_cards'
						onClick={() => {
							setDisplay(true)
							localStorage.setItem('storage-display', 'true')
						}}
					>
						<Grip />
					</button>
				</div>
				<CreateFolderButton
					folder_id={currentFolder?.id}
					onSuccess={async () => await fetchData(currentFolder?.id)}
				/>
				<Upload
					folder_id={currentFolder?.id}
					onSuccess={async () => await fetchData(currentFolder?.id)}
				/>
			</div>
			{data ? (
				display ? (
					<FileTiles
						files={data.files}
						folders={data.folders}
						onSuccess={fetchData}
					/>
				) : (
					<FileTable
						files={data.files}
						folders={data.folders}
						onSuccess={fetchData}
					/>
				)
			) : (
				<div className='storage-loader'>
					<Loader />
				</div>
			)}
			<Modal active={modalActive} setActive={setModalActive}>
				<div className='drag-and-drop-modal'>
					<div className='drag-and-drop-modal__icon'>
						<UploadIcon />
					</div>
					<div className='drag-and-drop-modal__text'>Загрузить</div>
				</div>
			</Modal>
		</section>
	)
}

export default Storage
