import React from 'react'
import Upload from '@components/UploadInput/UploadInput.tsx'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import SortSettings from '@components/SortSettings/SortSettings'
import './StorageInfo.css'

const StorageInfo: React.FC = () => {
	return (
		<section className='storage-info'>
			<Upload />
			<ProgressBar size={128849018880} filled={101349018880} />
			<SortSettings />
		</section>
	)
}

export default StorageInfo
