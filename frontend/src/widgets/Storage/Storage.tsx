import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
// import { tempfiles, tempfolders } from '@app/data'
import uploadFile from '@services/requests/Upload'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'
import { Rotate } from '@components/Icons/Icons'
import getDiskSize from '@services/requests/getDiskSize'

interface StorageProps {
	folder_id?: string | undefined
}

const Storage: React.FC<StorageProps> = ({ folder_id = undefined }) => {
	const [data, setData] = useState<DiskDTO | null>(null)
	const [reloadActive, setReloadActive] = useState<boolean>(false)

	const fetchData = async () => {
		const response = await Disk(folder_id)
		setData(response)
	}

	useEffect(() => {
		fetchData()
	}, [folder_id])

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
				<Upload
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
				<CreateFolderButton
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
				<div
					style={{
						width: '50%',
						margin: '0 auto',
					}}
				>
					<ProgressBar
						usedSize={Number(async () => {
							return await getDiskSize()
						})}
						totalSize={21474836009}
					/>
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
					folder_id={folder_id}
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
