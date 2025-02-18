import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
// import { tempfiles } from '@app/data'

interface StorageProps {
	folder_id?: string | undefined
}

const Storage: React.FC<StorageProps> = ({ folder_id = undefined }) => {
	const [data, setData] = useState<DiskDTO | null>(null)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Disk(folder_id)
				setData(response)
			} catch (error) {
				console.error('Error fetching files:', error)
			}
		}
		fetchData()
	}, [])

	return (
		<section className='storage'>
			<SearchInput
				placeholder='Searching file...'
				onSubmit={() => alert('submit')}
			/>
			{data ? (
				<FileTable files={data.files} folders={data.folders} />
			) : (
				<p style={{ width: '200px', height: '200px', position: 'relative' }}>
					<Loader />
				</p>
			)}
		</section>
	)
}

export default Storage
