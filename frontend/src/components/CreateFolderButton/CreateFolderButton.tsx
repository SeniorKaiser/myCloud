import React, { useState } from 'react'
import './CreateFolderButton.css'
import Loader from '@components/Loading/Loading'
import { FolderPlus } from '@components/Icons/Icons'
import createFolder from '@services/requests/CreateFolder'

interface CreateFolderButtonProps {
	folder_id?: string | undefined
	onSuccess: () => Promise<void> | void
}

const CreateFolderButton: React.FC<CreateFolderButtonProps> = ({
	folder_id,
	onSuccess,
}) => {
	const [loading, setLoading] = useState(false)
	return (
		<button
			className='create-folder-button'
			onClick={async () => {
				setLoading(true)
				const folderName = prompt('Folder name:', 'New Folder')
				if (folderName) {
					try {
						await createFolder(folderName, folder_id)
						await Promise.resolve(onSuccess())
					} finally {
						setLoading(false)
					}
				}
				setLoading(false)
			}}
		>
			<section>
				{loading ? (
					<div style={{ width: '1.7rem', height: '1.7rem' }}>
						<Loader />
					</div>
				) : (
					<FolderPlus />
				)}
			</section>
		</button>
	)
}

export default CreateFolderButton
