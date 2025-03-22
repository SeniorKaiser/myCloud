import { ReactNode, useEffect, useRef, FC } from 'react'
import { Position } from './Data'
import { File, Folder, User } from '@app/data'
import './ContextMenu.css'
import ListOptions from '@components/ListOptions/ListOptions'
import { Option } from '@components/ListOptions/Data'

interface ContextMenuProps {
	position: Position
	onClose: () => void
	options: Option[]
	children?: ReactNode
	onSuccess: (item: any) => void
	object: File | Folder | User
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
				<ListOptions options={options} object={object} onSuccess={onSuccess} />
			</div>
		</>
	)
}

export default ContextMenu
