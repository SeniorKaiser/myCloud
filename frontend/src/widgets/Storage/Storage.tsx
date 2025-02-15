import React, { useEffect, useState } from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import Disk, { DiskDTO } from '@services/requests/Disk'
import Loader from '@components/Loading/Loading'
import { tempfiles } from '@app/data'

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
				<FileTable files={tempfiles} folders={data.folders} />
			) : (
				<p style={{ width: '200px', height: '200px', position: 'relative' }}>
					<Loader />
				</p>
			)}
		</section>
	)
}

export default Storage
