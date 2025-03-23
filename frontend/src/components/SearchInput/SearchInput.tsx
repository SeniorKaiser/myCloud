import { useState, useRef, FC } from 'react'
import { MagnifyingGlass, XMark } from '@components/Icons/Icons'
import './SearchInput.css'

interface SearchInputProps {
	placeholder: string
	setData: (response: any) => void
	searchFunction: (string: string) => any
}

const SearchInput: FC<SearchInputProps> = ({
	placeholder,
	setData,
	searchFunction,
}) => {
	const [param, setParam] = useState<string>('')
	const searchRef = useRef<HTMLFormElement>(null)

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		if (param.trim()) {
			setData(await searchFunction(param))
		}
	}

	const handleClear = async () => {
		setParam('')
	}

	return (
		<form className={`search`} onSubmit={handleSearch} ref={searchRef}>
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
		</form>
	)
}

export default SearchInput
