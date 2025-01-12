import React from 'react'
import './Input.css'

export type InputProps = {
	errorMessage?: string
	error?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({
	placeholder,
	errorMessage,
	error = false,
	type = 'text',
	...rest
}) => {
	return (
		<label className='input_container'>
			<input className='input' data-error={error} type={type} {...rest} />
			{error && errorMessage && (
				<p className='input_error' data-error={error}>
					{errorMessage}
				</p>
			)}
			{placeholder && <p className='input_placeholder'>{placeholder}</p>}
		</label>
	)
}

export default Input
