import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
import uploadFile from '@services/requests/Upload'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'
import { ChevronLeft, Download as UploadIcon } from '@components/Icons/Icons'
import getFolder from '@services/requests/getFolder'
import Modal from '@components/Modal/Modal'
import { Folder } from '@app/data'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)
	// const [reloadActive, setReloadActive] = useState<boolean>(false)
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [currentFolder, setCurrentFolder] = useState<Folder | undefined>(
		undefined
	)

	const fetchData = async (fid?: string) => {
		let folderId = currentFolder?.id
		if (fid) {
			const curFolder = await getFolder(fid)
			setCurrentFolder(curFolder)
			folderId = curFolder.id
		} else if (fid == null) {
			folderId = undefined
			setCurrentFolder(undefined)
		}
		const response = await Disk(folderId)
		setData(response)
	}

	useEffect(() => {
		fetchData()
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
				>
					{currentFolder && <ChevronLeft />}
					<span>{currentFolder?.name}</span>
				</button>
				{/* <button
					onClick={async () => {
						try {
							setReloadActive(true)
							await new Promise(resolve => setTimeout(resolve, 500))
							await fetchData(currentFolder?.id)
						} finally {
							setReloadActive(false)
						}
					}}
					className={
						reloadActive
							? 'storage-reload-button active'
							: 'storage-reload-button'
					}
				>
					<Rotate />
				</button> */}
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
				<FileTable
					files={data.files}
					folders={data.folders}
					onSuccess={fetchData}
				/>
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
