export interface Link {
	title: string
	link: string
	icon?: React.FC | undefined
}

export const navLinks: Link[] = [
	{ title: 'Home', link: './' },
	{ title: 'Features', link: './features' },
	{ title: 'Pricing', link: './pricing' },
	{ title: 'Contacts', link: './contacts' },
]
