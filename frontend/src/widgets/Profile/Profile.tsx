import { useState, useEffect, FC } from 'react'
import ContextMenu from '@components/ContextMenu/ContextMenu.tsx'
import { Position } from '@components/ContextMenu/Data'
import { ProfileOptionsContextMenu } from './Data'
import { User as UserIcon, UserSecret } from '@components/Icons/Icons'
import { User } from '@app/data'
import AuthUser from '@services/requests/AuthUser'
import './Profile.css'
import Loader from '@components/Loading/Loading'
import copyToClipboard from '@services/functions/copyToClipboard'

const Profile: FC = () => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({
		position: 'fixed',
	})
	const [user, setUser] = useState<User | undefined>(undefined)
	const [isloading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true)
			const fetched_user = await AuthUser()
			if (fetched_user) {
				setUser(fetched_user)
			}
			setLoading(false)
		}
		fetchUser()
	}, [])

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({ position: 'fixed', right: '0.3rem', top: '4rem' })
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
	}
	if (isloading) {
		return (
			<section className='profile-loader'>
				<Loader />
			</section>
		)
	}

	return (
		<section className='profile' onClick={handleContextMenu}>
			{user ? (
				<div className='profile-avatar'>
					<UserIcon />
				</div>
			) : (
				<div className='profile-avatar'>
					<a href='./login'>
						<UserSecret />
					</a>
				</div>
			)}
			{contextMenuVisible && user && (
				<ContextMenu
					options={ProfileOptionsContextMenu}
					position={menuPosition}
					onClose={handleCloseMenu}
					onSuccess={() => undefined}
					object={user}
				>
					<h2 onClick={() => copyToClipboard(user?.id)}>{user?.name}</h2>
					<p onClick={() => copyToClipboard(user?.id)}>{user?.id}</p>
				</ContextMenu>
			)}
		</section>
	)
}

export default Profile
