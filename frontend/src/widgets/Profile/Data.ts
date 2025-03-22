import { HardDrive, ArrowRightFromBracket } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ListOptions/Data'

export const ProfileOptionsContextMenu: Option[] = [
	{
		title: 'Диск',
		action: () => (window.location.href = '/disk'),
		icon: HardDrive,
	},
	{
		title: 'Сменить аккаунт',
		action: () => (window.location.href = '/login'),
		icon: ArrowRightFromBracket,
	},
]
