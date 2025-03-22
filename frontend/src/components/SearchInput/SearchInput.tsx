// import { useState, useRef, useEffect, FC } from 'react'
// import { MagnifyingGlass, XMark } from '@components/Icons/Icons'
// // import diskSearch from '@services/requests/SearchFiles'
// import './SearchInput.css'
// // import { DiskDTO } from '@services/requests/Disk'
// // import FileTable from '@components/FileTable/FileTable'
// // import { tempfiles, tempfolders } from '@app/data'

// interface SearchInputProps {
// 	placeholder: string
// }

// const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
// 	const [param, setParam] = useState<string>('')
// 	// const [data, setData] = useState<DiskDTO>({ id: '', files: [], folders: [] })
// 	const [active, setActive] = useState<boolean>(false)
// 	const searchRef = useRef<HTMLFormElement>(null)

// 	const handleSearch = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		setActive(true)
// 		if (param.trim()) {
// 			// const result = await diskSearch(param)
// 			// setData(result)
// 		}
// 	}

// 	const handleClear = async () => {
// 		setParam('')
// 		setActive(false)
// 	}

// 	const handleClickOutside = (event: MouseEvent) => {
// 		if (
// 			searchRef.current &&
// 			!searchRef.current.contains(event.target as Node)
// 		) {
// 			setActive(false)
// 		}
// 	}

// 	useEffect(() => {
// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside)
// 		}
// 	}, [])

// 	return (
// 		<form
// 			className={`search ${active ? 'active' : ''}`}
// 			onSubmit={handleSearch}
// 			ref={searchRef}
// 		>
// 			<div className='search-input'>
// 				<button type='submit'>
// 					<MagnifyingGlass />
// 				</button>
// 				<input
// 					type='text'
// 					placeholder={placeholder}
// 					value={param}
// 					onChange={e => setParam(e.target.value)}
// 				/>
// 				<button type='reset' onClick={handleClear}>
// 					<XMark />
// 				</button>
// 			</div>
// 			<div className={`search-data ${active ? 'active' : ''}`}>
// 				{/* <FileTable files={data.files} folders={[]} onSuccess={() => {}} setObject={() => {}}/> */}
// 			</div>
// 		</form>
// 	)
// }

// export default SearchInput
