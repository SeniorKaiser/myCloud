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
		const user = await RegRequest({
			username: formValue.username,
			password: formValue.password,
			email: formValue.email,
		})
		if (user) {
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
				<label>Регистрация</label>
				<div className='form_link'>
					У вас есть аккаунт?<a href='./login'> Вход</a>
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
			<button className='form_button'>Регистрация</button>
		</form>
	)
}

export default RegForm
