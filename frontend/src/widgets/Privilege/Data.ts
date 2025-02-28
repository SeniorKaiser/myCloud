export interface PrivilegeCard {
	title: string
	description: feature[]
	price: number
	color: string
	action: () => void
}

export interface feature {
	title: string
	description: string
}

export const listPrivilegeCard: PrivilegeCard[] = [
	{
		title: 'Base',
		description: [
			{ title: 'Storage', description: '20gb' },
			{ title: '24/7 support', description: '' },
			{ title: 'Protection Guarantee', description: '' },
			{ title: 'All Basic Services', description: '' },
		],
		price: 0,
		color: 'black',
		action: () => alert('Base'),
	},
	{
		title: 'Professional',
		description: [
			{ title: 'Bigest Storage', description: '1024gb' },
			{ title: '24/7 Support', description: '' },
			{ title: 'Priority support', description: '' },
			{ title: 'Protection Guarantee', description: '' },
			{ title: 'Cancel Anytime', description: '' },
			{ title: 'All Basic Services', description: '' },
			{ title: '', description: '' },
			{ title: '', description: '' },
			{ title: '', description: '' },
		],
		price: 6.99,
		color: '#4362ee',
		action: () => alert('Professional'),
	},
]
