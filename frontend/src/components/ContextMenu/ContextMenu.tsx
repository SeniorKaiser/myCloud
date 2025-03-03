import { ReactNode, useEffect, useRef, FC } from 'react'
import { Position, Option } from './Data'
import { File, Folder } from '@app/data'
import './ContextMenu.css'

interface ContextMenuProps {
	position: Position
	onClose: () => void
	options: Option[]
	children?: ReactNode
	onSuccess?: (folder_id?: string) => Promise<void> | void
	object?: File | Folder | undefined
}

const ContextMenu: FC<ContextMenuProps> = ({
	position = { position: 'fixed' },
	onClose,
	children,
	options,
	object,
	onSuccess,
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
							onClick={async () => {
								await option.action(object?.id)
								if (onSuccess) {
									await onSuccess(object?.parent_folder)
								}
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
