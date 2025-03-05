import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './CustomPrompt.css'
import Input from '@components/Input/Input'

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
				<Input
					placeholder={message}
					value={inputValue}
					type='text'
					onChange={e => setInputValue(e.target.value)}
					autoFocus
				/>
				<div className='modal-buttons'>
					<button onClick={handleCancel} className='cancel-btn'>
						Отменить
					</button>
					<button onClick={handleConfirm} className='confirm-btn'>
						Подтвердить
					</button>
				</div>
			</div>
		</div>,
		document.body
	)
}

export default CustomPrompt
