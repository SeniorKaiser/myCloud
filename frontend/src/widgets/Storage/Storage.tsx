import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import Upload from '@components/UploadInput/UploadInput.tsx'
// import { tempfiles, tempfolders } from '@app/data'
import uploadFile from '@services/requests/Upload'
// import SortSettings from '@components/SortSettings/SortSettings'
import CreateFolderButton from '@components/CreateFolderButton/CreateFolderButton'

interface StorageProps {
	folder_id?: string | undefined
}

const Storage: React.FC<StorageProps> = ({ folder_id = undefined }) => {
	const [data, setData] = useState<DiskDTO | null>(null)

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
		await Promise.resolve(fetchData)
	}

	return (
		<section
			className='storage'
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<SearchInput
				placeholder='Searching file...'
				onSubmit={() => alert('submit')}
			/>
			<div className='storage-functions'>
				<Upload
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
				<CreateFolderButton
					folder_id={folder_id}
					onSuccess={async () => await fetchData()}
				/>
				{/* <SortSettings /> */}
				<button onClick={fetchData}>Reload</button>
				{/* <ProgressBar size={128849018880} filled={101349018880} /> */}
			</div>
			{data ? (
				<FileTable
					files={data.files}
					folders={data.folders}
					folder_id={folder_id}
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
