import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, RotateRight } from '@components/Icons/Icons'
import './SizeChanger.css'

const SizeChanger: React.FC = () => {
	const [size, setSize] = useState(16)

	// Функция для изменения размера шрифта
	const changeSize = (delta: number) => {
		setSize(prevSize => Math.max(10, prevSize + delta))
	}

	useEffect(() => {
		document.documentElement.style.fontSize = `${size}px`
	}, [size])

	return (
		<div className='size-changer'>
			<div>{Math.round((size / 16) * 100)}%</div>
			<button onClick={() => changeSize(-2)}>
				<ChevronDown />
			</button>
			<button onClick={() => setSize(16)}>
				<RotateRight />
			</button>
			<button onClick={() => changeSize(2)}>
				<ChevronUp />
			</button>
		</div>
	)
}

export default SizeChanger
