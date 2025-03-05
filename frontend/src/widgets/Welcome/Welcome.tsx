import React from 'react'
import './Media.css'
import './Welcome.css'

const Welcome: React.FC = () => {
	return (
		<>
			<div className='welcome'>
				<div className='welcome__title'>
					<h1>Готовы ли вы к революции в области хранения данных?</h1>
					<p>
						Освободите место на своих устройствах и сохраните важные файлы в
						безопасности с помощью нашего облачного хранилища. Получите доступ к
						своим данным в любое время, синхронизируйте их на всех устройствах и
						надежно защитите - все, что вам нужно для удобства и душевного
						спокойствия!
					</p>
					<div className='welcome__title--buttons'>
						<span>
							У вас нет учетной записи? <a href='./reg'>Регистрация</a>
						</span>
						<button onClick={() => (window.location.href = './login')}>
							Вход
						</button>
					</div>
				</div>
			</div>
			<img src='/demo-home.png' className='demo-home-img' />
			<img src='/demo-home-mobile.png' className='demo-home-mobile-img' />
		</>
	)
}

export default Welcome
