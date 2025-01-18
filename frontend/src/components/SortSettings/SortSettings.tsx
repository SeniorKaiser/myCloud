import React from 'react'
import { SortFunctions } from './SortSettingsData'
import './SortSettings.css'

const SortSettings: React.FC = () => {
	return (
		<section className='sort-section'>
			{SortFunctions.map(func => (
				<button className='sort-button' key={func.title}>
					{func.icon && <func.icon />} {func.title} {func.title}
				</button>
			))}
		</section>
	)
}

export default SortSettings
