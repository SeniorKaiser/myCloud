import React, { useState, useEffect } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from '@app/data.ts'
import AuthUser from '@services/requests/AuthUser'
import { User } from '@components/Icons/Icons'
import './Profile.css'

const Profile: React.FC = () => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})
	const [user, setUser] = useState<string | undefined>(undefined)

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({ right: '0.3rem' })
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
	}

	useEffect(() => {
		const fetchUser = async () => {
			const user_ = await AuthUser()
			if (user_) {
				setUser(user_)
			} else {
				setUser(undefined)
			}
		}
		fetchUser()
	}, [])
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
						<a href='./reg'>Reg</a>
						<a href='./login'>Login</a>
					</div>
					<div className='profile-unauthoraized-slim'>
						<a href='./login'>
							<User />
						</a>
					</div>
				</>
			)}
			{user && contextMenuVisible && (
				<ContextMenu
					options={ProfileOptionsContextMenu}
					position={menuPosition}
					onClose={handleCloseMenu}
				/>
			)}
		</section>
	)
}

export default Profile
