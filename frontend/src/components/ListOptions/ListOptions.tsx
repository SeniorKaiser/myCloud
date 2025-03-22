import { FC } from 'react'
import { Option } from './Data'
import { Folder, File, User } from '@app/data'
import './ListOptions.css'

interface ListOptionsProps {
	options: Option[]
	onSuccess: (item: any) => void
	object: File | Folder | User
}

const ListOptions: FC<ListOptionsProps> = ({ options, onSuccess, object }) => {
	return (
		<ul className='list-options'>
			{options.map((option, index) => (
				<li
					key={index}
					onClick={async () => {
						await option.action(object.id)
						await onSuccess(object)
					}}
					className='option'
				>
					<span>
						<option.icon />
					</span>
					{option.title}
				</li>
			))}
		</ul>
	)
}

export default ListOptions
