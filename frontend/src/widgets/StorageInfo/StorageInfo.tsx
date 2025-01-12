import React from 'react'
import Upload from '@components/UploadInput/UploadInput.tsx'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import './StorageInfo.css'

const StorageInfo: React.FC = () => {
	return (
		<section className='storage-info'>
			<Upload />
			<ProgressBar size={128849018880} filled={70000000000} />
		</section>
	)
}

export default StorageInfo
