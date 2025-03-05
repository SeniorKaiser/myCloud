import {
	HardDrive,
	Sliders,
	ArrowRightFromBracket,
} from '@components/Icons/Icons.tsx'
import { Option } from '@components/ContextMenu/Data'

export const ProfileOptionsContextMenu: Option[] = [
	{
		title: 'Диск',
		action: () => (window.location.href = '/disk'),
		icon: HardDrive,
	},
	{
		title: 'Настройки',
		action: () => (window.location.href = '/settings'),
		icon: Sliders,
	},
	{
		title: 'Изменить учетную запись',
		action: () => (window.location.href = '/login'),
		icon: ArrowRightFromBracket,
	},
]
