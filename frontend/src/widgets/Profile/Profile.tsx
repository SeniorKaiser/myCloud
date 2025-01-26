import React, { useState, useEffect } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from '@app/data.ts'
import AuthUser from '@services/requests/AuthUser'
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
		<section className='profile' onClick={handleContextMenu}>
			{user ? (
				<img
					className='avatar'
					src='https://storage.yandexcloud.net/mycloud-backet/files/6.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEDldjsx-XYZdVQNP6MnFi%2F20250118%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250118T145950Z&X-Amz-Expires=259200&X-Amz-Signature=FF1DA3D2D23CE48EB0229EA4A02E2336D8A5B21E755C6F6E26275DF47A240E14&X-Amz-SignedHeaders=host'
					alt='avatar'
				/>
			) : (
				<div className='profile-unauthoraized'>
					<a href='./reg'>Reg</a>
					<a href='./login'>Login</a>
				</div>
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
