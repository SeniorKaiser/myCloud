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
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	options,
	position,
	onClose,
	title,
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
			<div className='context-menu-title' style={{ padding: '0.3rem 0.6rem' }}>
				{title}
			</div>
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
