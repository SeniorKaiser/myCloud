import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '@components/Input/Input'
import { config, FormDataI, initialState } from './Config'
import loginRequest from '@services/requests/Login'
import './LoginForm.css'

const LoginForm: React.FC = () => {
	const [formValue, setFormValue] = useState<FormDataI>(initialState)
	const [error, setError] = useState<string | undefined>(undefined)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof FormDataI
		const value = e.target.value
		setFormValue(prev => ({ ...prev, [name]: value }))
	}
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const token = await loginRequest({
			username: formValue.username,
			password: formValue.password,
		})
		if (token) window.location.href = '/'
		else setError('Неверное имя или пароль')
	}
	return (
		<form className='form_container' onSubmit={onSubmit}>
			<p className='form_title'>
				<label>Войдите в аккаунт</label>
				<div className='form_link'>
					У вас нет аккаунта? <a href='./reg'>Регистрация</a>
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
			<button className='form_button'>Вход</button>
		</form>
	)
}

export default LoginForm
