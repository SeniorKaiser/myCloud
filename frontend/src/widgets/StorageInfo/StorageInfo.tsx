import React from 'react'
import Upload from '@components/UploadInput/UploadInput.tsx'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import SortSettings from '@components/SortSettings/SortSettings'
import './StorageInfo.css'

interface StorageInfoProps {
	folder_id?: string | undefined
}

const StorageInfo: React.FC<StorageInfoProps> = ({ folder_id = undefined }) => {
	return (
		<section className='storage-info'>
			<Upload folder_id={folder_id} />
			<ProgressBar size={128849018880} filled={101349018880} />
			<SortSettings />
		</section>
	)
}

export default StorageInfo
