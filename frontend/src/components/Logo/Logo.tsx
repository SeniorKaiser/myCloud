import React from 'react'
import { title } from '@app/data.ts'
import './Logo.css'

const Logo: React.FC = () => {
	return (
		<a className='logo' href='./'>
			<img src='/logo.svg' alt='logo' className='logo-image' />
			<span className='logo-text'>{title}</span>
		</a>
	)
}

export default Logo
