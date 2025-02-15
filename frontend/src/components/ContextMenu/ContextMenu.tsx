import React, { useEffect, useRef } from 'react'
import { Option } from './Data'
import './ContextMenu.css'

export interface Position {
	top?: string | undefined
	left?: string | undefined
	right?: string | undefined
	bottom?: string | undefined
}

interface ContextMenuProps {
	options: Option[]
	position: Position
	onClose: () => void
	title?: string | undefined
	objectId?: string | undefined
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	options,
	position,
	onClose,
	title,
	objectId,
}) => {
	const menuRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<ul
			className='context-menu'
			ref={menuRef}
			style={{
				top: position.top,
				left: position.left,
				right: position.right,
				bottom: position.bottom,
			}}
		>
			<li>{title}</li>
			<li style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{objectId}</li>
			{options.map((option, index) => (
				<li key={index} onClick={option.action}>
					<span>
						<option.icon />
					</span>
					{option.title}
				</li>
			))}
		</ul>
	)
}

export default ContextMenu
