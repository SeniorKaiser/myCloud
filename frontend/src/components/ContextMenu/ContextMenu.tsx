import React, { useEffect, useRef, useState } from 'react'
import { Option } from './Data'
import './ContextMenu.css'
import { copyToClipboard } from '@services/functions/copyToClipboard'
import Modal from '@components/Modal/Modal'

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
	onSuccess?: () => Promise<void> | void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	options,
	position,
	onClose,
	title,
	objectId,
	onSuccess,
}) => {
	const menuRef = useRef<HTMLUListElement>(null)
	const [modalActive, setModalActive] = useState<boolean>(false)

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
			<li
				className='context-menu__title'
				value={title}
				onClick={() => setModalActive(true)}
			>
				{title}
			</li>
			<li
				className='context-menu__id'
				value={objectId}
				onClick={() => copyToClipboard(objectId)}
			>
				{objectId}
			</li>
			{options.map((option, index) => (
				<li
					key={index}
					onClick={async () => {
						setModalActive(true)
						await option.action(objectId)
						if (onSuccess) {
							await onSuccess()
						}
					}}
				>
					<span>
						<option.icon />
					</span>
					{option.title}
				</li>
			))}
			<Modal active={modalActive} setActive={setModalActive}></Modal>
		</ul>
	)
}

export default ContextMenu
