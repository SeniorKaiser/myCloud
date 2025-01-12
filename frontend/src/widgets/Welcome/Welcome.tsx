import React from 'react'
import './Media.css'
import './Welcome.css'

const Welcome: React.FC = () => {
	return (
		<>
			<div className='welcome'>
				<div className='welcome__title'>
					<h1>Are you ready for the data storage revolution?</h1>
					<p>
						Free up space on your devices and keep your important files safe
						with our cloud storage. Access your data anytime, synchronise across
						all devices and securely protect it - everything you need for
						convenience and peace of mind!
					</p>
					<div className='welcome__title--buttons'>
						<span>
							Don't have account? <a href='./reg'>Registration</a>
						</span>
						<button onClick={() => (window.location.href = './login')}>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Welcome
