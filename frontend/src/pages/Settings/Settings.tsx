import React from 'react'
import Loader from '@components/Loading/Loading'
import Header from '@widgets/Header/Header'
import Footer from '@widgets/Footer/Footer'
import './Settings.css'

const Settings: React.FC = () => {
	return (
		<>
			<Header />
			<main className='settings-main'>
				<section className='settings'>
					<Loader />
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Settings
