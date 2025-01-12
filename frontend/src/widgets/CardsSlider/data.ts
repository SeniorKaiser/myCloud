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
	},
	{
		id: 2,
		title: 'Modern design for convenient operation!',
		description:
			'Our cloud storage is not only fast and secure, but also intuitive, stylishly designed for your convenience.',
	},
	{
		id: 3,
		title: 'Lightning fast speed of your cloud storage!',
		description:
			'Forget about long waits to download your files! Our cloud storage provides instant access to your data with high-speed servers and advanced transfer technologies.',
	},
	{
		id: 4,
		title: 'Round-the-clock support - we are always on call!',
		description:
			'Have a question or need help? Our support team is available 24/7 to ensure you have a seamless cloud storage experience at all times.',
	},
	{
		id: 5,
		title: 'Flexible rates - pay only for what you need!',
		description:
			'We offer favourable tariff plans that are suitable for both personal and business use. Transparent terms and conditions, no hidden fees!',
	},
	{
		id: 6,
		title: 'Share files in one click!',
		description:
			'Sharing files has never been easier! Our cloud storage allows you to instantly send links to documents, photos and videos without complicated settings.',
	},
]
