export interface Card {
	id: number
	title: string
	description: string
	img_path?: string | undefined
}

export const sliderCards: Card[] = [
	{
		id: 1,
		title: 'Надежно защитите свои данные в облаке!',
		description:
			'Ваши файлы в полной безопасности! В нашем облачном хранилище используются передовые технологии шифрования и защиты, чтобы обеспечить максимальную сохранность ваших данных.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/cloud.svg',
	},
	{
		id: 2,
		title: 'Современный дизайн для удобного управления!',
		description:
			'Наше облачное хранилище не только быстрое и безопасное, но и интуитивно понятное, стильно оформленное для вашего удобства.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/dedicated.svg',
	},
	{
		id: 3,
		title: 'Молниеносная скорость работы вашего облачного хранилища!',
		description:
			'Забудьте о долгом ожидании загрузки ваших файлов! Наше облачное хранилище обеспечивает мгновенный доступ к вашим данным благодаря высокоскоростным серверам и передовым технологиям передачи.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/ddos.svg',
	},
	{
		id: 4,
		title: 'Круглосуточная поддержка - мы всегда на связи!',
		description:
			'У вас есть вопросы или вам нужна помощь? Наша служба поддержки работает круглосуточно, чтобы обеспечить бесперебойную работу облачного хранилища в любое время суток.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/mlops.svg',
	},
]
