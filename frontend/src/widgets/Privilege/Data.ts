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
		title: 'Base',
		subtitle: 'доступен всем',
		description: [
			{ title: 'Объем хранилища', description: '20гб' },
			{ title: 'Круглосуточная поддержка', description: '' },
			{ title: 'Гарантия защиты', description: '' },
			{ title: 'Загрузака и скачивание файлов', description: 'до 5гб' },
		],
		price: 0,
		action: () => (window.location.href = '/reg'),
	},
]
