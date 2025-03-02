import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './CustomPrompt.css'

interface CustomPromptProps {
	message: string
	onClose: (result: string | null) => void
}

const CustomPrompt: React.FC<CustomPromptProps> = ({ message, onClose }) => {
	const [inputValue, setInputValue] = useState('')

	const handleConfirm = () => onClose(inputValue)
	const handleCancel = () => onClose(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') handleConfirm()
			if (e.key === 'Escape') handleCancel()
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [inputValue])

	return createPortal(
		<div className='modal-overlay'>
			<div className='modal-content'>
				<p>{message}</p>
				<input
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					className='input-field'
					autoFocus
				/>
				<div className='modal-buttons'>
					<button onClick={handleCancel} className='cancel-btn'>
						Отмена
					</button>
					<button onClick={handleConfirm} className='confirm-btn'>
						ОК
					</button>
				</div>
			</div>
		</div>,
		document.body
	)
}

export default CustomPrompt
