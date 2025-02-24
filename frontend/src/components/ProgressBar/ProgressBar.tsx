import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
	totalSize: number
	usedSize: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSize, usedSize }) => {
	const percentage =
		totalSize > 0 ? ((usedSize / totalSize) * 100).toFixed(2) : '0'

	const totalSizeGB = (totalSize / 1024 ** 3).toFixed(2)
	return (
		<div className='progress-bar'>
			<div className='line' style={{ width: `${percentage}%` }}></div>
			<span>
				{percentage}% from {totalSizeGB} GB
			</span>
		</div>
	)
}

export default ProgressBar
