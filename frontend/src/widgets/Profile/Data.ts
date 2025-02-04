import {
	HardDrive,
	User,
	Sliders,
	ArrowRightFromBracket,
} from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'

export const ProfileOptionsContextMenu: Option[] = [
	{
		title: 'Disk',
		action: () => (window.location.href = '/disk'),
		icon: HardDrive,
	},
	{
		title: 'Settings',
		action: () => (window.location.href = '/settings'),
		icon: Sliders,
	},
	{
		title: 'Change Account',
		action: () => (window.location.href = '/login'),
		icon: ArrowRightFromBracket,
	},
]
