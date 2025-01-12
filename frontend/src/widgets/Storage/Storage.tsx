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
			<FileTable files={TempFilesList} />
		</section>
	)
}

export default Storage
