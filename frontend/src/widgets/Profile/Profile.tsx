import React, { useState } from 'react'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu.tsx'
import { ProfileOptionsContextMenu } from '@app/data.ts'
import './Profile.css'

const Profile: React.FC = () => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [menuPosition, setMenuPosition] = useState<Position>({})

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault()
		setMenuPosition({ right: '0.3rem' })
		setContextMenuVisible(true)
	}

	const handleCloseMenu = (): void => {
		setContextMenuVisible(false)
	}

	return (
		<section className='profile' onClick={handleContextMenu}>
			<img className='avatar' src='/logo.svg' alt='avatar' />
			{contextMenuVisible && (
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
