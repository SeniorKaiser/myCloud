import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import Welcome from '@widgets/Welcome/Welcome'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import './Home.css'

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main className='home-main'>
				<Welcome />
				<section className='features'>
					<h1>Features</h1>
					<CardsSlider
						width='min(100%, 60rem)'
						height='100%'
						cards_in_row={2}
					/>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Home
