import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
// import { tempfiles, tempfolders } from '@app/data'
import uploadFile from '@services/requests/Upload'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'
import { Rotate, ChevronLeft, ChevronRight } from '@components/Icons/Icons'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)
	const [reloadActive, setReloadActive] = useState<boolean>(false)
	const [folder, setFolder] = useState<string | undefined>(undefined)
	const [prevfolder, setprevFolder] = useState<string | undefined>(undefined)

	const fetchData = async (folder_id?: string) => {
		const response = await Disk(folder_id)
		setprevFolder(folder)
		setFolder(folder_id)
		setData(response)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const files = Array.from(e.dataTransfer.files)
		if (files.length === 0) return
		await Promise.all(files.map(file => uploadFile(file, folder)))
		await fetchData()
	}

	return (
		<section
			className='storage'
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<SearchInput placeholder='Searching file...' />
			<div className='storage-functions'>
				<Upload folder_id={folder} onSuccess={async () => await fetchData()} />
				<CreateFolderButton
					folder_id={folder}
					onSuccess={async () => await fetchData()}
				/>
				<div className='storage-navigation'>
					<button
						onClick={async () => {
							await fetchData(prevfolder)
						}}
					>
						<ChevronLeft />
					</button>
					<button
						onClick={async () => {
							await fetchData(folder)
						}}
					>
						<ChevronRight />
					</button>
				</div>
				<button
					onClick={async () => {
						try {
							setReloadActive(true)
							await new Promise(resolve => setTimeout(resolve, 500))
							await fetchData()
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
				</button>
			</div>
			{data ? (
				<FileTable
					files={data.files}
					folders={data.folders}
					onSuccess={fetchData}
				/>
			) : (
				// <FileTable
				// 	files={tempfiles}
				// 	folders={tempfolders}
				// 	folder_id={folder_id}
				// />
				<div className='storage-loader'>
					<Loader />
				</div>
			)}
		</section>
	)
}

export default Storage
