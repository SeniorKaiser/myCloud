import React, { useRef, useState, useEffect } from 'react'
import './BuergerMenu.css'

interface BurgerMenuProps {
	width: string
	height: string
	navRef: React.RefObject<HTMLElement>
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ width, height, navRef }) => {
	const burgerMenu = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(prev => !prev)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		if (burgerMenu.current) {
			burgerMenu.current.classList.toggle('active', isOpen)
		}
		if (navRef.current) {
			navRef.current.classList.toggle('nav-active', isOpen)
		}
		document.body.style.overflow = isOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen, navRef])

	return (
		<div
			ref={burgerMenu}
			className='burger-menu'
			style={{ width: width, height: height }}
			onClick={handleClick}
		>
			<span className='burger-menu__item'></span>
		</div>
	)
}

export default BurgerMenu
