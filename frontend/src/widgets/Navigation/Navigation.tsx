import { forwardRef } from 'react'
import { navLinks } from './Data.ts'
import './Navigation.css'

const Navigation = forwardRef<HTMLElement>((_, ref) => {
	return (
		<nav ref={ref}>
			{navLinks.map(link => (
				<a href={link.link} key={link.title}>
					<link.icon /> {link.title}
				</a>
			))}
		</nav>
	)
})

export default Navigation
