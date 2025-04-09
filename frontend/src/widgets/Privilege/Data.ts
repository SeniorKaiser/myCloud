import { Question } from '@widgets/AnswersQuestions/data'

export const QuestionsPricing: Question[] = [
	{
		question: 'Требуется ли вводить данные карты для бесплатного доступа?',
		answer: 'Нет, данные карты не нужны для бесплатного использования.',
	},
	{
		question: 'Можно ли отменить подписку?',
		answer: 'Подписку можно отменить в любой удобный для вас момент.',
	},
]

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
	// {
	// 	title: 'Professional',
	// 	subtitle: 'В скором времени',
	// 	description: [
	// 		{ title: 'Объем хранилища', description: '1024гб' },
	// 		{ title: 'Круглосуточная поддержка', description: '' },
	// 		{ title: 'Гарантия защиты', description: '' },
	// 		{ title: 'Загрузака и скачивание файлов', description: 'до 5гб' },
	// 	],
	// 	price: 650,
	// 	action: () => (window.location.href = '/reg'),
	// },
]
