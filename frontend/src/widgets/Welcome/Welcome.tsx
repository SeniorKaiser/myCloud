import React from 'react'
import './Media.css'
import './Welcome.css'
import { Star } from '@components/Icons/Icons'
import Logo from '@components/Logo/Logo'

const Welcome: React.FC = () => {
	return (
		<div className='welcome'>
			{/* <div className='welcome-container__picture'>
					<picture>
						<source
							srcSet='/demo-home-mobile.webp'
							media='(max-width: 35rem)'
						/>
						<source srcSet='/demo-home.webp' media='(min-width: 35rem)' />
						<img src='/demo-home.webp' loading='lazy' alt='Demo Home' />
					</picture>
				</div> */}
			<div className='welcome-container__content'>
				<h1>The future starts from this point</h1>
				<p>
					Освободите место на своих устройствах и сохраните важные файлы в
					безопасности с помощью нашего облачного хранилища.
				</p>
				<div className='welcome-container__content-stars'>
					<h3>Средняя оценка: </h3>
					{Array.from({ length: 5 }).map((_, i) => (
						<Star key={i} />
					))}
				</div>
				<button
					onClick={() => {
						window.location.href = './reg'
					}}
				>
					Начать сейчас
				</button>
			</div>
			<div className='welcome-container__logo'>
				<Logo />
			</div>
		</div>
	)
}

export default Welcome
