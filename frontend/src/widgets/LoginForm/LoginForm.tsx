import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '@components/Input/Input'
import { config, FormDataI, initialState } from './Config'
import loginRequest from '@services/requests/Login'
import './LoginForm.css'

const LoginForm: React.FC = () => {
	const [formValue, setFormValue] = useState<FormDataI>(initialState)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof FormDataI
		const value = e.target.value
		setFormValue(prev => ({ ...prev, [name]: value }))
	}
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await loginRequest({
			username: formValue.username,
			password: formValue.password,
		})
		window.location.href = '/'
	}
	return (
		<form className='form_container' onSubmit={onSubmit}>
			<p className='form_title'>
				<label>Login</label>
				<div>
					Dont have account? <a href='./reg'>Create your account</a>
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
			<button className='form_button'>Login</button>
		</form>
	)
}

export default LoginForm
