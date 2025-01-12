import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
	size: number
	filled: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ size, filled }) => {
	return (
		<div className='progress-bar'>
			<div
				className='line'
				style={{ width: `${(filled / (size / 100)).toFixed(0)}%` }}
			></div>
			{(filled / (size / 100)).toFixed(0)}% from {size / 8 / 1024 / 1024 / 1024}{' '}
			GB
		</div>
	)
}

export default ProgressBar
