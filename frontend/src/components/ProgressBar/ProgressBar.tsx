import React from 'react'

interface ProgressBarProps {
	totalSize: number // Общий объем (в байтах)
	usedSize: number // Использованный объем (в байтах)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSize, usedSize }) => {
	const percentage =
		totalSize > 0 ? ((usedSize / totalSize) * 100).toFixed(2) : '0'

	const totalSizeGB = (totalSize / 1024 ** 3).toFixed(2)

	return (
		<div className='progress-bar'>
			<div className='line' style={{ width: `${percentage}%` }}></div>
			{percentage}% from {totalSizeGB} GB
		</div>
	)
}

export default ProgressBar
