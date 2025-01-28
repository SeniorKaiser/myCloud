import React from 'react'
import Header from '@widgets/Header/Header'
import Footer from '@widgets/Footer/Footer'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import RegForm from '@widgets/RegForm/RegForm.tsx'
import './Reg.css'

const Reg: React.FC = () => {
	return (
		<>
			<Header />
			<main className='reg-main'>
				<div className='reg-main__container'>
					<RegForm />
					<CardsSlider width='30rem' height='30rem' />
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Reg
