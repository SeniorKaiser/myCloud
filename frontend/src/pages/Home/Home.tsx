import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import Welcome from '@widgets/Welcome/Welcome'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import PrivilegeInfo from '@widgets/Privilege/Privilege'
// import ChartCards from '@widgets/ChartCards/ChartCards'
// import { ChartsData } from './Data.ts'
import './Home.css'

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main className='home-main'>
				<section className='welcome-container'>
					<Welcome />
					<div className='features-container' style={{ height: '15rem' }}>
						<CardsSlider
							width='min(100%, 60rem)'
							height='100%'
							cards_in_row={2}
						/>
					</div>
				</section>
				<section className='privilege-container'>
					<h1 style={{ textAlign: 'center' }}>Privilege</h1>
					<PrivilegeInfo />
				</section>
				<section className='statistic'></section>
			</main>
			<Footer />
		</>
	)
}

export default Home
