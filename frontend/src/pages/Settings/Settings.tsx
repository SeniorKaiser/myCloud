import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import SizeChanger from '@widgets/SizeChanger/SizeChanger'
import './Settings.css'

const Settings: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<SizeChanger />
			</main>
			<Footer />
		</>
	)
}

export default Settings
