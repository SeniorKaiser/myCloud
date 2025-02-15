import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'

const Storage: React.FC = () => {
	const [data, setData] = useState<DiskDTO | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await Disk()
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
				<p>Loading files...</p>
			)}
		</section>
	)
}

export default Storage
