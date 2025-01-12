import React from 'react'
import { SortFunctions } from './SortSettingsData'
import { ArrowUp, ArrowDown } from '@components/Icons/Icons'
import './SortSettings.css'

const SortSettings: React.FC = () => {
	return (
		<section className='sort-section'>
			{SortFunctions.map(func => (
				<button className='sort-button' key={func.title}>
					{func.title} <ArrowUp />
				</button>
			))}
		</section>
	)
}

export default SortSettings
