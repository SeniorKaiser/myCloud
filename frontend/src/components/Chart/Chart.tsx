import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export interface Dataset {
	label: string
	data: number[]
	borderColor: string
}

interface LineChartProps {
	labels: string[]
	datasets: Dataset[]
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets }) => {
	const chartRef = useRef<any>(null)

	const chartData = {
		labels: labels,
		datasets: datasets.map(dataset => ({
			...dataset,
			borderWidth: 2,
			fill: false,
			tension: 0.4,
			pointRadius: 0,
		})),
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: {
			x: { display: true },
			y: {
				display: false,
				suggestedMin: Math.min(...datasets.flatMap(d => d.data)) * 0.9,
				suggestedMax: Math.max(...datasets.flatMap(d => d.data)) * 1.1,
			},
		},
	}

	return <Line ref={chartRef} data={chartData} options={options} />
}

export default LineChart
