import React, { useRef, useState } from 'react'
import { Plus } from '@components/Icons/Icons.tsx'
import uploadFile from '@services/requests/Upload'
import './UploadInput.css'

const Upload: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFilesChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || files.length === 0) return

		setLoading(true)
		setError(null)

		try {
			const response = await uploadFile(files[0])
			console.log('Файл загружен:', response)
			alert('Файл успешно загружен!')
		} catch (err) {
			setError('Ошибка загрузки файла. Попробуйте снова.')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='upload'>
			<button
				className='upload-button'
				onClick={handleClick}
				disabled={loading}
			>
				<Plus /> {loading ? 'Загрузка...' : 'Upload'}
			</button>
			<input
				type='file'
				ref={fileInputRef}
				className='upload-input'
				onChange={handleFilesChange}
				style={{ display: 'none' }}
			/>
			{error && <p className='error-message'>{error}</p>}
		</div>
	)
}

export default Upload
