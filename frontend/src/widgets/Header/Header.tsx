import Logo from '@components/Logo/Logo.tsx'
import React, { useRef } from 'react'
import Profile from '@widgets/Profile/Profile'
import Navigation from '@widgets/Navigation/Navigation'
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher'
import BurgerMenu from '@components/BurgerMenu/BurgerMenu'
import './Header.css'
import './Media.css'

const Header: React.FC = () => {
	const navRef = useRef<HTMLDivElement>(null)

	return (
		<header>
			<Logo />
			<Navigation ref={navRef} />
			<div className='header__elements'>
				<ThemeSwitcher />
				<Profile />
				<BurgerMenu width='2rem' height='2rem' navRef={navRef} />
			</div>
		</header>
	)
}

export default Header
