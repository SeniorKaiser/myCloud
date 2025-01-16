import React from 'react'
import LineChart, { Dataset } from '@components/Chart/Chart'
import './ChartCards.css'

export interface StatisticCardProps {
	title: string
	data: Dataset[]
}

const ChartCards: React.FC<StatisticCardProps> = ({ title, data }) => {
	const lastValue = data[data.length - 1].data.at(-1) || 0
	const prevValue = data[data.length - 1].data.at(-2) || 1

	const growth = ((lastValue / prevValue) * 100 - 100).toFixed(2)

	return (
		<div className='statistic-card'>
			<h3>{title}</h3>
			<h2>{lastValue.toLocaleString()}</h2>
			<p
				className='growth'
				style={{
					color: lastValue > prevValue ? 'lime' : 'red',
				}}
			>
				{lastValue > prevValue ? '+' : '-'}
				{growth}%
			</p>
			<div className='chart-container'>
				<LineChart
					labels={['Jan', 'May', 'Sep', 'Jan', 'May', 'Sep']}
					datasets={data}
				/>
			</div>
		</div>
	)
}

export default ChartCards
