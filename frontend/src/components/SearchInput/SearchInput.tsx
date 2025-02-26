import React, { useState, useRef, useEffect } from 'react'
import {
	EllipsisVertical,
	MagnifyingGlass,
	XMark,
} from '@components/Icons/Icons'
import diskSearch from '@services/requests/SearchFiles'
import './SearchInput.css'
import { DiskDTO } from '@services/requests/Disk'

interface SearchInputProps {
	placeholder: string
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
	const [param, setParam] = useState<string>('')
	const [data, setData] = useState<DiskDTO | null>(null)
	const [active, setActive] = useState<boolean>(false)
	const searchRef = useRef<HTMLFormElement>(null)

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		setActive(true)

		try {
			if (param.trim()) {
				const result = await diskSearch(param)
				setData(result)
			}
		} catch (error) {
			console.error('Ошибка при поиске:', error)
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
				{[...(data?.folders ?? []), ...(data?.files ?? [])].map(item => (
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

						<div>
							<EllipsisVertical />
						</div>
					</div>
				))}
			</div>
		</form>
	)
}

export default SearchInput
