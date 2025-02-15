import React, { useState, useEffect } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from './Data'
import { User as UserIcon, UserSecret } from '@components/Icons/Icons'
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
				<>
					<div className='profile-avatar'>
						<a href='./login'>
							<UserIcon />
						</a>
					</div>
				</>
			) : (
				<>
					<div className='profile-avatar'>
						<a href='./login'>
							<UserSecret />
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
					objectId={user.id}
				/>
			)}
		</section>
	)
}

export default Profile
