import { useState } from 'react'
import { Moon, Sun } from '@components/Icons/Icons'
import './ThemeSwitcher.css'

const ThemeSwitcher = () => {
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem('theme') === 'dark'
	})

	const toggleTheme = () => {
		const root = document.documentElement
		if (isDark) {
			root.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		} else {
			root.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		}
		setIsDark(!isDark)
	}

	return (
		<>
			<div className='theme-switch' onClick={toggleTheme}>
				<div className={`switch ${isDark ? 'dark' : 'light'}`}>
					<span>{isDark ? <Moon /> : <Sun />}</span>
				</div>
			</div>
		</>
	)
}

export default ThemeSwitcher
