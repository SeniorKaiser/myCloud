import React from 'react'
import { listPrivilegeCard } from './Data'
import { Crown, CircleCheck } from '@components/Icons/Icons'
import './Privilege.css'

const PrivilegeInfo: React.FC = () => {
	return (
		<div className='privilege'>
			{listPrivilegeCard.map((data, id) => (
				<div className='privilege-card' key={id}>
					<h2>
						{data.title}{' '}
						<span style={{ color: data.color }}>
							<Crown />
						</span>
					</h2>
					<ul className='privilege-card__description'>

						{data.description.map((features, idx) =>( 
							<li key={idx}><CircleCheck/> {features.title}: {features.description}</li>
						))}
					</ul>
					<p className='privilege-card_price'>
						Price: <span style={{ fontSize: '2rem' }}>{data.price}$</span> /
						month
					</p>
					<button onClick={data.action} style={{ backgroundColor: data.color }}>
						{data.title}
					</button>
				</div>
			))}
		</div>
	)
}

export default PrivilegeInfo
