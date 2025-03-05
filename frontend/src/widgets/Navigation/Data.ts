export interface Link {
	title: string
	link: string
	icon?: React.FC | undefined
}

export const navLinks: Link[] = [
	{ title: 'Домой', link: './' },
	{ title: 'Диск', link: './disk' },
]
