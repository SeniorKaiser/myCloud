import React from 'react'
import Logo from '@components/Logo/Logo.tsx'
import Navigation from '@widgets/Navigation/Navigation'
import './Footer.css'

const Footer: React.FC = () => {
	return (
		<footer>
			<Logo />
			<section className='footer-nav'>
				<h1>Ссылки</h1>
				<Navigation />
			</section>
			<section className='footer-author'>
				<h1>Создатели</h1>
				<p>Илья Дмитриев</p>
			</section>
		</footer>
	)
}

export default Footer
