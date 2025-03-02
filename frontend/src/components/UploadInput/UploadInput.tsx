import React, { useRef, useState } from 'react'
import { Plus } from '@components/Icons/Icons.tsx'
import uploadFile from '@services/requests/Upload'
import Loader from '@components/Loading/Loading'
// import customPrompt from '@components/CustomPrompt/PromptHelper'
import './UploadInput.css'

interface UploadProps {
	folder_id?: string | undefined
	onSuccess: () => Promise<void> | void
}

const Upload: React.FC<UploadProps> = ({
	folder_id = undefined,
	onSuccess,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFilesChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || files.length === 0) return
		setLoading(true)

		let isMounted = true
		try {
			const response = await uploadFile(files[0], folder_id)
			if (isMounted) {
				console.log('Файл загружен:', response)
				await Promise.resolve(onSuccess())
			}
		} catch (err) {
			console.error(err)
		} finally {
			if (isMounted) {
				setLoading(false)
				event.target.value = ''
			}
		}

		return () => {
			isMounted = false
		}
	}

	return (
		<div className='upload'>
			<button
				className='upload-button'
				onClick={handleClick}
				// onClick={async () => await customPrompt('Upload')}
				disabled={loading}
			>
				<section>
					{loading ? (
						<div style={{ width: '2rem', height: '2rem' }}>
							<Loader />
						</div>
					) : (
						<>
							<Plus /> <span>Upload</span>
						</>
					)}
				</section>
			</button>
			<input
				type='file'
				ref={fileInputRef}
				className='upload-input'
				onChange={handleFilesChange}
				style={{ display: 'none' }}
			/>
		</div>
	)
}

export default Upload
