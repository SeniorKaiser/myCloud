import React, { useRef, useState } from 'react'
import { Plus } from '@components/Icons/Icons.tsx'
import uploadFile from '@services/requests/Upload'
import Loader from '@components/Loading/Loading'
import './UploadInput.css'

interface UploadProps {
	folder_id?: string | undefined
}

const Upload: React.FC<UploadProps> = ({ folder_id = undefined }) => {
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
				alert('Файл успешно загружен!')
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
				disabled={loading}
			>
				<section>
					{loading ? (
						<Loader />
					) : (
						<>
							<Plus /> Upload
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
