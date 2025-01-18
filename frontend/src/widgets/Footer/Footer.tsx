import React from 'react'
import Logo from '@components/Logo/Logo.tsx'
import './Footer.css'

const Footer: React.FC = () => {
	return (
		<footer>
			<Logo />
			<section>
				<h1>Links</h1>
				<ul>
					<li>
						<a href='./'>Home</a>
					</li>
					<li>
						<a href='./'>About</a>
					</li>
					<li>
						<a href='./'>News</a>
					</li>
					<li>
						<a href='./'>Contacts</a>
					</li>
				</ul>
			</section>
			<section>
				<h1>Creators</h1>
				<p>Ilya Dmitriev</p>
			</section>
		</footer>
	)
}

export default Footer
