import { HardDrive, ArrowRightFromBracket } from '@components/Icons/Icons.tsx'
import { Option } from '@components/ListOptions/Data'
import logoutRequest from '@services/requests/Logout'

export const ProfileOptionsContextMenu: Option[] = [
	{
		title: 'Диск',
		action: () => (window.location.href = '/disk'),
		icon: HardDrive,
	},
	{
		title: 'Выйти из аккаунта',
		action: async () =>
			await logoutRequest().then(() => (window.location.href = '/login')),
		icon: ArrowRightFromBracket,
	},
]
