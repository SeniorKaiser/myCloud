import React from 'react'
import Header from '@widgets/Header/Header'
import Footer from '@widgets/Footer/Footer'
import LoginForm from '@widgets/LoginForm/LoginForm'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import { Toaster } from 'react-hot-toast'
import './Login.css'

const Login: React.FC = () => {
	return (
		<>
			<Header />
			<main className='login-main'>
				<div className='login-main__container'>
					<LoginForm />
					<CardsSlider width='30rem' height='30rem' />
				</div>
			</main>
			<Footer />
			<Toaster position='bottom-right' />
		</>
	)
}

export default Login
