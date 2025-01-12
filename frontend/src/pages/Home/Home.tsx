import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import Welcome from '@widgets/Welcome/Welcome'
import './Home.css'

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main className='home-main'>
				<Welcome />
			</main>
			<Footer />
		</>
	)
}

export default Home
