import React from 'react'
import Header from '@widgets/Header/Header'
import Footer from '@widgets/Footer/Footer'
import PrivilegeInfo from '@widgets/Privilege/Privilege'
import './Pricing.css'

const Pricing: React.FC = () => {
	return (
		<>
			<Header />
			<main className='pricing-main'>
				<section>
					<PrivilegeInfo />
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Pricing
