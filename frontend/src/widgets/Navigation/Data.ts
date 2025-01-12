import { HardDrive, User } from '@components/Icons/Icons'

export interface Link {
	title: string
	link: string
	icon: React.FC
}

export const navLinks: Link[] = [
	{ title: 'Disk', link: './disk', icon: HardDrive },
	{ title: 'Friends', link: './friends', icon: User },
]
