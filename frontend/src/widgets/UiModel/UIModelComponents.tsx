import { MagnifyingGlass, XMark } from '@components/Icons/Icons'
import { itemsUi } from './Data'
import { getFileIcon } from '@components/Icons/IconsReact'

export const BurgerMenuModel = () => {
	return (
		<div className='screen-head-burger'>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}

export const SearchModel = () => {
	return (
		<div className='func-content__search'>
			<MagnifyingGlass />
			<div>Найти</div>
			<XMark />
		</div>
	)
}

export const ContentModel = () => {
	return (
		<div className='content'>
			{itemsUi.map((item, index) => (
				<div key={index} className='model-file'>
					<div>{getFileIcon(item.extension)}</div>
					<span>{item.name}</span>
				</div>
			))}
		</div>
	)
}
