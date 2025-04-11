import { FC } from 'react'
import './UiModel.css'
import Logo from '@components/Logo/Logo'
import { getFileIcon } from '@components/Icons/IconsReact'
import {
	FolderPlus,
	MagnifyingGlass,
	Plus,
	XMark,
} from '@components/Icons/Icons'
import { itemsUi } from './Data.ts'

const UiModel: FC = () => {
	const randomItems = [...itemsUi].sort(() => Math.random() - 0.5).slice(0, 3)
	return (
		<div className='scena'>
			<div className='uimodel-container'>
				<div className='uimodel-screen'>
					<div className='screen-head'>
						<div className='screen-head-burger'>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<Logo />
					</div>
					<div className='screen-content'>
						<div className='func-content'>
							<div className='func-content__search'>
								<MagnifyingGlass />
								<div>Найти</div>
								<XMark />
							</div>
							<div className='func-content_st-func'>
								<div className='func-content__create-folder'>
									<FolderPlus />
								</div>
								<div className='func-content__upload'>
									<Plus />
									<div>Загрузить</div>
								</div>
							</div>
						</div>
						<div className='content'>
							{itemsUi.map((item, index) => (
								<div key={index} className='model-file'>
									<div>{getFileIcon(item.extension)}</div>
									<span>{item.name}</span>
								</div>
							))}
						</div>
					</div>
					<div className='screen-footer'></div>
				</div>
			</div>
			{randomItems.map((item, index) => (
				<div key={item.id} className={`air-file air-file-${index}`}>
					<div>{getFileIcon(item.extension)}</div>
					<span>{item.name}</span>
				</div>
			))}
		</div>
	)
}

export default UiModel
