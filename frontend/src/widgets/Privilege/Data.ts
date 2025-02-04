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
		title: 'Free',
		description: [
			{ title: 'Storage', description: '20gb' },
			{ title: '24/7 support', description: '+' },
			{ title: 'protection guarantee', description: '+' },
		],
		price: 0,
		color: '#afafaf',
		action: () => alert('Free'),
	},
	{
		title: 'Gold',
		description: [
			{ title: 'Storage', description: '512gb' },
			{ title: '24/7 support', description: '+' },
			{ title: 'protection guarantee', description: '+' },
		],
		price: 3.99,
		color: '#e1cd00',
		action: () => alert('Gold'),
	},
	{
		title: 'Platinum',
		description: [
			{ title: 'Storage', description: '1024gb' },
			{ title: '24/7 support', description: '+' },
			{ title: 'protection guarantee', description: '+' },
		],
		price: 6.99,
		color: '#009bd5',
		action: () => alert('Platinum'),
	},
]
