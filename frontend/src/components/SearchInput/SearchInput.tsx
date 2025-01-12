import React from 'react'
import './SearchInput.css'
import { XMark, MagnifyingGlass } from '@components/Icons/Icons.tsx'

interface SearchInputProps {
	placeholder: string
	onSubmit: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSubmit }) => {
	return (
		<form className='search'>
			<button type='submit' onClick={onSubmit}>
				<MagnifyingGlass />
			</button>
			<input type='text' placeholder={placeholder} />
			<button type='reset'>
				<XMark />
			</button>
		</form>
	)
}

export default SearchInput
