import React, { useRef } from 'react'
import { Plus } from '@components/Icons/Icons.tsx'
import './UploadInput.css'

const Upload: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files) {
			console.log([...files])
		}
	}

	return (
		<div className='upload'>
			<button className='upload-button' onClick={handleClick}>
				<Plus /> Upload
			</button>
			<input
				type='file'
				ref={fileInputRef}
				className='upload-input'
				multiple
				onChange={handleFilesChange}
				style={{ display: 'none' }}
			/>
		</div>
	)
}

export default Upload
