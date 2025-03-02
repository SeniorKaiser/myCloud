import { ReactNode, useEffect, useRef, FC } from 'react'
import { Position, Option } from './Data'
import { File, Folder, User } from '@app/data'
import './ContextMenu.css'

interface ContextMenuProps {
	position: Position
	onClose: () => void
	options: Option[]
	children?: ReactNode
	onSuccess?: () => void
	object: File | Folder | User | undefined
}

const ContextMenu: FC<ContextMenuProps> = ({
	position = { position: 'fixed' },
	onClose,
	children,
	options,
	object,
}) => {
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose()
			}
		}
		const handleScroll = () => {
			onClose()
		}
		document.addEventListener('mousedown', handleClickOutside)
		window.addEventListener('scroll', handleScroll)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [onClose])

	return (
		<>
			<div
				className='context-menu'
				ref={menuRef}
				style={{
					position: position.position,
					top: position.top,
					left: position.left,
					right: position.right,
					bottom: position.bottom,
				}}
			>
				{children}
				<ul>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								option.action(object?.id)
							}}
						>
							<span>
								<option.icon />
							</span>
							{option.title}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default ContextMenu
