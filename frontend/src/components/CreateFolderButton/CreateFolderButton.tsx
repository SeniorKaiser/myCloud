import React, { useState } from 'react'
import './CreateFolderButton.css'
import Loader from '@components/Loading/Loading'
import { FolderPlus } from '@components/Icons/Icons'
import createFolder from '@services/requests/CreateFolder'

interface CreateFolderButtonProps {
	folder_id?: string | undefined
}

const CreateFolderButton: React.FC<CreateFolderButtonProps> = ({
	folder_id,
}) => {
	const [loading, setLoading] = useState(false)
	return (
		<button
			className='create-folder-button'
			onClick={async () => {
				setLoading(true)
				const folderName = prompt('Folder name:', 'New Folder')
				if (folderName) {
					await createFolder(folderName, folder_id)
					setLoading(false)
					window.location.reload()
				}
			}}
		>
			<section>{loading ? <Loader /> : <FolderPlus />}</section>
		</button>
	)
}

export default CreateFolderButton
