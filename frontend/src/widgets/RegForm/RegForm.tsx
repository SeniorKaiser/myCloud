import React from 'react'
import Input from '@components/Input/Input'
import { config, FormDataI, initialState } from './Config'
import { ChangeEvent, FormEvent, useState } from 'react'
import RegRequest from '@services/requests/Reg'
import './RegForm.css'

const RegForm: React.FC = () => {
	const [formValue, setFormValue] = useState<FormDataI>(initialState)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof FormDataI
		const value = e.target.value
		setFormValue(prev => ({ ...prev, [name]: value }))
	}
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await RegRequest({
			username: formValue.username,
			password: formValue.password,
			email: formValue.email,
		})
	}
	return (
		<form className='form_container' onSubmit={onSubmit}>
			<p className='form_title'>
				<label>Registration</label>
				<div>
					Have account? <a href='./login'>Login</a>
				</div>
			</p>
			{config.map(item => {
				const { validate, name, ...rest } = item
				return (
					<Input
						key={name}
						onChange={onChange}
						name={name}
						value={formValue[name]}
						{...rest}
					/>
				)
			})}
			<button className='form_button'>Registration</button>
		</form>
	)
}

export default RegForm
