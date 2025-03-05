import React from 'react'
import Input from '@components/Input/Input'
import { config, FormDataI, initialState } from './Config'
import { ChangeEvent, FormEvent, useState } from 'react'
import RegRequest from '@services/requests/Reg'
import loginRequest from '@services/requests/Login'
import './RegForm.css'

const RegForm: React.FC = () => {
	const [formValue, setFormValue] = useState<FormDataI>(initialState)
	const [error, setError] = useState<string | undefined>(undefined)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof FormDataI
		const value = e.target.value
		setFormValue(prev => ({ ...prev, [name]: value }))
	}
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const token = await RegRequest({
			username: formValue.username,
			password: formValue.password,
			email: formValue.email,
		})
		if (token) {
			await loginRequest({
				username: formValue.username,
				password: formValue.password,
			})
			window.location.href = '/'
		} else setError('Wrong username or password')
	}
	return (
		<form className='form_container' onSubmit={onSubmit}>
			<p className='form_title'>
				<label>Registration</label>
				<div>
					Have account? <a href='./login'>Login</a>
				</div>
				<div className='form_container-error'>{error}</div>
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
