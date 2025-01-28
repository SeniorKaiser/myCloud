import React from 'react'
import Loader from '@components/Loading/Loading'
import './Settings.css'

const Settings: React.FC = () => {
	return (
		<>
			<main>
				<section
					style={{ width: '100px', height: '100px', position: 'relative' }}
				>
					<Loader />
				</section>
			</main>
		</>
	)
}

export default Settings
