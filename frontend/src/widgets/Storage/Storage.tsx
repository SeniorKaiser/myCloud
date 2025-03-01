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
import { Rotate, ChevronLeft } from '@components/Icons/Icons'
import getFolder from '@services/requests/getFolder'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)
	const [reloadActive, setReloadActive] = useState<boolean>(false)
	const [folder_id, setFolder_id] = useState<string | undefined>(undefined)
	const [folder_name, setFolder_name] = useState<string | undefined>(undefined)
	const [prevfolder, setprevFolder] = useState<string | undefined>(undefined)

	const fetchData = async (folder_id?: string) => {
		const response = await Disk(folder_id)
		if (folder_id) {
			const curfolder = await getFolder(folder_id)
			setprevFolder(curfolder?.parent_folder)
			setFolder_name(curfolder?.name)
		}
		setFolder_id(folder_id)
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
		await Promise.all(files.map(file => uploadFile(file, folder_id)))
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
				<button
					onClick={async () => {
						await fetchData(prevfolder)
					}}
					className='storage__prev'
				>
					<ChevronLeft />
				</button>
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
				<CreateFolderButton
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
				<Upload
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
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
