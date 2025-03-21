import React from 'react'
import './Media.css'
import './Welcome.css'

const Welcome: React.FC = () => {
	return (
		<>
			<div className='welcome'>
				<div className='welcome__title'>
					<h1 aria-label='Next-gen cloud storage!'>
						Best&nbsp;<span className='typewriter'></span>
					</h1>
					<p>
						Освободите место на своих устройствах и сохраните важные файлы в
						безопасности с помощью нашего облачного хранилища.
					</p>
					<div className='welcome__title--buttons'>
						<span>
							У вас нет аккаунта? <a href='./reg'>Регистрация</a>
						</span>
						<button onClick={() => (window.location.href = './login')}>
							Вход
						</button>
					</div>
				</div>
			</div>
			<picture>
				<source srcSet='/demo-home-mobile.webp' media='(max-width: 35rem)' />
				<source srcSet='/demo-home.webp' media='(min-width: 35rem)' />
				<img
					src='/demo-home.webp'
					className='demo-home-img'
					loading='lazy'
					alt='Demo Home'
				/>
			</picture>
		</>
	)
}

export default Welcome
