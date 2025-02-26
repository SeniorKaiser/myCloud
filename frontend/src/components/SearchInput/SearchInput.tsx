import React, { useState } from 'react'
import { MagnifyingGlass, XMark } from '@components/Icons/Icons'
import diskSearch from '@services/requests/SearchFiles'
import './SearchInput.css'

interface SearchInputProps {
	placeholder: string
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
	const [param, setParam] = useState<string>('')

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		if (param.trim()) {
			console.log(param)
			await diskSearch(param)
		}
	}

	return (
		<form className='search' onSubmit={handleSearch}>
			<button type='submit'>
				<MagnifyingGlass />
			</button>
			<input
				type='text'
				placeholder={placeholder}
				value={param}
				onChange={e => setParam(e.target.value)}
			/>
			<button type='reset' onClick={() => setParam('')}>
				<XMark />
			</button>
		</form>
	)
}

export default SearchInput
