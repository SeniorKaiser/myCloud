import React from 'react'
import { listPrivilegeCard } from './Data'
import { Check } from '@components/Icons/Icons'
import './Privilege.css'

const PrivilegeInfo: React.FC = () => {
	return (
		<div className='privilege'>
			{listPrivilegeCard.map((data, id) => (
				<div className='privilege-card' key={id}>
					<h2>{data.title}</h2>
					<h5>{data.subtitle}</h5>
					<ul className='privilege-card__description'>
						{data.description.map((features, idx) => (
							<li key={idx}>
								<Check /> {features.title}
							</li>
						))}
					</ul>
					<p className='privilege-card-buy'>
						<div>{data.price}₽ / месяц</div>
						<button onClick={data.action}>Начать</button>
					</p>
				</div>
			))}
		</div>
	)
}

export default PrivilegeInfo
