import React from 'react'
import Logo from '@components/Logo/Logo.tsx'
import Navigation from '@widgets/Navigation/Navigation'
import './Footer.css'

const Footer: React.FC = () => {
	return (
		<footer>
			<Logo />
			<section className='footer-nav'>
				<Navigation />
			</section>
			<section className='footer-author'>
				<h1>Creators</h1>
				<p>Ilya Dmitriev</p>
			</section>
		</footer>
	)
}

export default Footer
