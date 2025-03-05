export interface PrivilegeCard {
	title: string
	subtitle: string
	description: feature[]
	price: number
	action: () => void
}

export interface feature {
	title: string
	description: string
}

export const listPrivilegeCard: PrivilegeCard[] = [
	{
		title: 'Базовая',
		subtitle: 'доступна всем',
		description: [
			{ title: 'Объем хранилища', description: '20gb' },
			{ title: 'Круглосуточная поддержка', description: '' },
			{ title: 'Гарантия защиты', description: '' },
			{ title: 'Все основные услуги', description: '' },
		],
		price: 0,
		action: () => (window.location.href = '/reg'),
	},
]
