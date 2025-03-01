import React, { useState, useRef, useEffect } from 'react'
import {
	EllipsisVertical,
	MagnifyingGlass,
	XMark,
} from '@components/Icons/Icons'
import diskSearch from '@services/requests/SearchFiles'
import './SearchInput.css'
import { DiskDTO } from '@services/requests/Disk'
import ContextMenu, { Position } from '@components/ContextMenu/ContextMenu'
import {
	FileOptionsContextMenu,
	FolderOptionsContextMenu,
} from '@components/FileTable/Data'
import { Folder, File } from '@app/data'

interface SearchInputProps {
	placeholder: string
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
	const [param, setParam] = useState<string>('')
	const [data, setData] = useState<DiskDTO | null>(null)
	const [active, setActive] = useState<boolean>(false)
	const searchRef = useRef<HTMLFormElement>(null)
	// const items = [...(data?.folders ?? []), ...(data?.files ?? [])]
	const items = [...(data?.files ?? [])]
	const [contextMenu, setContextMenu] = useState<{
		visible: boolean
		position: Position
		title?: string
		objectId?: string
		options?: any
	}>({
		visible: false,
		position: {},
	})

	const handleContextMenuOptions = (
		event: React.MouseEvent,
		item: File | Folder
	): void => {
		event.preventDefault()
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
		setContextMenu({
			visible: true,
			position: {
				top: `${Math.min(event.clientY, window.innerHeight)}px`,
				right: `${Math.min(event.clientX, window.innerWidth - rect.left)}px`,
			},
			title: item.name,
			objectId: item.id,
			options:
				'size' in item ? FileOptionsContextMenu : FolderOptionsContextMenu,
		})
	}
	const handleCloseMenu = (): void =>
		setContextMenu({ visible: false, position: {} })

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		setActive(true)
		if (param.trim()) {
			const result = await diskSearch(param)
			setData(result)
		}
	}

	const handleClear = async () => {
		setParam('')
		setActive(false)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			searchRef.current &&
			!searchRef.current.contains(event.target as Node)
		) {
			setActive(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<form
			className={`search ${active ? 'active' : ''}`}
			onSubmit={handleSearch}
			ref={searchRef}
		>
			<div className='search-input'>
				<button type='submit'>
					<MagnifyingGlass />
				</button>
				<input
					type='text'
					placeholder={placeholder}
					value={param}
					onChange={e => setParam(e.target.value)}
				/>
				<button type='reset' onClick={handleClear}>
					<XMark />
				</button>
			</div>
			<div className={`search-data ${active ? 'active' : ''}`}>
				{items.length > 0 ? (
					items.map(item => (
						<div
							key={item.id}
							data-name={item.name}
							data-id={item.id}
							style={{ cursor: 'extension' in item ? 'default' : 'pointer' }}
							className='search-data-el'
						>
							<div style={{ display: 'inline-flex', width: '100%' }}>
								<img
									src={`/FilesIcons/${
										'extension' in item ? item.extension : 'folder'
									}.png`}
									alt={item.name}
								/>
								<span>{item.name}</span>
							</div>

							<div
								onClick={event => handleContextMenuOptions(event, item)}
								style={{ cursor: 'pointer' }}
							>
								<EllipsisVertical />
							</div>
						</div>
					))
				) : (
					<p className='no-results'>No results</p>
				)}
				{contextMenu.visible && (
					<ContextMenu
						options={contextMenu.options}
						position={contextMenu.position}
						onClose={handleCloseMenu}
						title={contextMenu.title}
						objectId={contextMenu.objectId}
					/>
				)}
			</div>
		</form>
	)
}

export default SearchInput
