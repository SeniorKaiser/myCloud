import React from 'react'
import { listPrivilegeCard } from './Data'
import { Crown } from '@components/Icons/Icons'
import './Privilege.css'

const PrivilegeInfo: React.FC = () => {
	return (
		<div className='privilege'>
			{listPrivilegeCard.map(data => (
				<div className='privilege-card'>
					<h2>
						{data.title}{' '}
						<span style={{ color: data.color }}>
							<Crown />
						</span>
					</h2>
					<p>Storage: {data.storage}gb</p>
					<p>
						Price: <span style={{ fontSize: '2rem' }}>{data.price}</span>$ /
						month
					</p>
					<button onClick={data.action} style={{ backgroundColor: data.color }}>
						Buy {data.title}
					</button>
				</div>
			))}
		</div>
	)
}

export default PrivilegeInfo
