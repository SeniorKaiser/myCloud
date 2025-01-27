import React, { useState } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from './Data'
import { User as UserIcon } from '@components/Icons/Icons'
import { User } from '@app/data'
import './Profile.css'

interface ProfileProps {
	User: User | undefined
}

const Profile: React.FC<ProfileProps> = ({ User }) => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})
	const [user] = useState<User | undefined>(User)

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({ right: '0.3rem' })
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
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
						<a href='./reg'>Reg</a>
						<a href='./login'>Login</a>
					</div>
					<div className='profile-unauthoraized-slim'>
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
				/>
			)}
		</section>
	)
}

export default Profile
