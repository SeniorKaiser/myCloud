import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
// import { tempfiles, tempfolders } from '@app/data'
import uploadFile from '@services/requests/Upload'

interface StorageProps {
	folder_id?: string | undefined
}

const Storage: React.FC<StorageProps> = ({ folder_id = undefined }) => {
	const [data, setData] = useState<DiskDTO | null>(null)
	useEffect(() => {
		const fetchData = async () => {
			const response = await Disk(folder_id)
			setData(response)
		}
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
		window.location.reload()
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
