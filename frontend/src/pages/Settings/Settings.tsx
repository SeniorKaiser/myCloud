import React from 'react'
import Header from '@widgets/Header/Header'
import Loader from '@components/Loading/Loading'
import './Settings.css'

const Settings: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Loader />
			</main>
		</>
	)
}

export default Settings
