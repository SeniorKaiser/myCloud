export interface Card {
	id: number
	title: string
	description: string
	img_path?: string | undefined
}

export const sliderCards: Card[] = [
	{
		id: 1,
		title: 'Securely protect your data in the cloud!',
		description:
			'Your files are safe and secure! Our cloud storage uses advanced encryption and security technologies to keep your data as safe as possible.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/dedicated.svg',
	},
	{
		id: 2,
		title: 'Modern design for convenient operation!',
		description:
			'Our cloud storage is not only fast and secure, but also intuitive, stylishly designed for your convenience.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/cloud.svg',
	},
	{
		id: 3,
		title: 'Lightning fast speed of your cloud storage!',
		description:
			'Forget about long waits to download your files! Our cloud storage provides instant access to your data with high-speed servers and advanced transfer technologies.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/ddos.svg',
	},
	{
		id: 4,
		title: 'Round-the-clock support - we are always on call!',
		description:
			'Have a question or need help? Our support team is available 24/7 to ensure you have a seamless cloud storage experience at all times.',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/mlops.svg',
	},
	{
		id: 5,
		title: 'Flexible rates - pay only for what you need!',
		description:
			'We offer favourable tariff plans that are suitable for both personal and business use. Transparent terms and conditions, no hidden fees!',
		img_path:
			'https://cdn.selectel.ru/site_v3/images/components/content/pages/index/swiper-cards/administration.svg',
	},
]
