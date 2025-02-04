import React, { useState, useEffect } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from './Data'
import { User as UserIcon } from '@components/Icons/Icons'
import { User } from '@app/data'
import AuthUser from '@services/requests/AuthUser'
import './Profile.css'
import Loader from '@components/Loading/Loading'

const Profile: React.FC = () => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})
	const [user, setUser] = useState<User | undefined>(undefined)
	const [isloading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true)
			const fetched_user = await AuthUser()
			if (fetched_user) {
				setUser(fetched_user)
			} else {
				setUser(undefined)
			}
			setLoading(false)
		}
		console.time('API Request')
		fetchUser()
		console.timeEnd('API Request')
	}, [])

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({ right: '0.3rem', top: '4rem' })
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
	}
	if (isloading) {
		return (
			<section
				style={{ width: '2.5rem', height: '2.5rem', position: 'relative' }}
			>
				<Loader />
			</section>
		)
	}

	return (
		<section className='profile' onClick={user ? handleContextMenu : undefined}>
			{user ? (
				<img
					className='avatar'
					src='https://storage.yandexcloud.net/mycloud-backet/uploads/465da2f3-2394-4d4a-9204-dc82efc26b7d/data/avatar.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEDldjsx-XYZdVQNP6MnFi%2F20250126%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250126T070226Z&X-Amz-Expires=604800&X-Amz-Signature=6E352BBC9FAE3B5DB92CA8F654C0E702B6EB099D7E8EE173DC2F697FA436F0AE&X-Amz-SignedHeaders=host'
					alt='avatar'
				/>
			) : (
				<>
					<div className='profile-unauthoraized'>
						<a href='./login'>
							<UserIcon />
						</a>
					</div>
				</>
			)}
			{user && contextMenuVisible && (
				<ContextMenu
					options={ProfileOptionsContextMenu}
					position={menuPosition}
					onClose={handleCloseMenu}
					title={user.name}
				/>
			)}
		</section>
	)
}

export default Profile
