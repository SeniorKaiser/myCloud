export interface PrivilegeCard {
	title: string
	storage: number
	price: number
	color: string
	action: () => void
}

export const listPrivilegeCard: PrivilegeCard[] = [
	{
		title: 'Silver',
		storage: 50,
		price: 1.99,
		color: '#afafaf',
		action: () => alert('Silver'),
	},
	{
		title: 'Gold',
		storage: 200,
		price: 3.99,
		color: '#e1cd00',
		action: () => alert('Gold'),
	},
	{
		title: 'Platinum',
		storage: 1024,
		price: 6.99,
		color: '#009bd5',
		action: () => alert('Platinum'),
	},
]
