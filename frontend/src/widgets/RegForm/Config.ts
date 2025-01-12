import { InputProps } from '@components/Input/Input'

type Config = (InputProps & {
	validate?: (error: FormDataI) => string
	name: keyof FormDataI
})[]

export const config: Config = [
	{
		name: 'username',
		placeholder: 'Username',
		type: 'text',
		required: true,
		validate: (error: FormDataI) => (error.username ? error.username : ''),
	},
	{
		name: 'email',
		placeholder: 'Email',
		required: true,
		type: 'email',
		minLength: 6,
		validate: (error: FormDataI) => (error.password ? error.password : ''),
	},
	{
		name: 'password',
		placeholder: 'Password',
		required: true,
		type: 'password',
		minLength: 6,
		validate: (error: FormDataI) => (error.password ? error.password : ''),
	},
]

export const initialState: FormDataI = {
	password: '',
	username: '',
	email: '',
}

export type FormDataI = {
	password: string
	username: string
	email: string
}
