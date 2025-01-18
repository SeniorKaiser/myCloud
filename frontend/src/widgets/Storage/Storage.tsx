import React from 'react'
import FileTable from '@components/FileTable/FileTable.tsx'
import SearchInput from '@components/SearchInput/SearchInput'
import './Storage.css'
import { TempFilesList } from '@app/data'

const Storage: React.FC = () => {
	return (
		<section className='storage'>
			<SearchInput
				placeholder='Searching file...'
				onSubmit={() => alert('submit')}
			/>
			{TempFilesList.length != 0 ? (
				<FileTable files={TempFilesList} />
			) : (
				<h1 style={{ marginTop: '5rem' }}>No such files</h1>
			)}
		</section>
	)
}

export default Storage
