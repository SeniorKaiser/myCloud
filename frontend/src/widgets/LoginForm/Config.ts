import { InputProps } from '@components/Input/Input'

type Config = (InputProps & {
	validate?: (error: FormDataI) => string
	name: keyof FormDataI
})[]

export const config: Config = [
	{
		name: 'username',
		placeholder: 'Имя пользователя',
		type: 'text',
		required: true,
		validate: (error: FormDataI) => (error.username ? error.username : ''),
	},
	{
		name: 'password',
		placeholder: 'Пароль',
		required: true,
		type: 'password',
		minLength: 6,
		validate: (error: FormDataI) => (error.password ? error.password : ''),
	},
]

export const initialState: FormDataI = {
	password: '',
	username: '',
}

export type FormDataI = {
	password: string
	username: string
}
