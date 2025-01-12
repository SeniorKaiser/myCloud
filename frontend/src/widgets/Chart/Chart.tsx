import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables, ScriptableContext } from 'chart.js'

Chart.register(...registerables)

interface GradientLineChartProps {
	labels: string[]
	data: number[]
}

const GradientLineChart: React.FC<GradientLineChartProps> = ({
	labels,
	data,
}) => {
	const chartRef = useRef<any>(null)

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Dataset',
				data: data,
				borderColor: '#4362ee',
				borderWidth: 2,
				fill: true,
				backgroundColor: (context: ScriptableContext<'line'>) => {
					const background = getComputedStyle(document.documentElement)
						.getPropertyValue('--background')
						.trim()
					const chart = chartRef.current as any
					const ctx = context.chart.ctx
					const height = chart ? chart.height + chart.height / 2 : 150
					const gradient = ctx.createLinearGradient(0, 0, 0, height)
					gradient.addColorStop(0, '#4362ee')
					gradient.addColorStop(1, background)
					return gradient
				},
				tension: 0.4,
				pointRadius: 0,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: { legend: { display: false } },
		scales: {
			x: { display: false },
			y: {
				display: false,
				suggestedMin: Math.min(...data) * 0.9,
				suggestedMax: Math.max(...data) * 1.1,
			},
		},
	}

	return <Line ref={chartRef} data={chartData} options={options} />
}

export default GradientLineChart
