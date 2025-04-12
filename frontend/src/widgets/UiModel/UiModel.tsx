import { FC } from 'react'
import './UiModel.css'
import Logo from '@components/Logo/Logo'
import { getFileIcon } from '@components/Icons/IconsReact'
import {
	ArrowPointer,
	ArrowUpFromBracket,
	FolderPlus,
	Plus,
} from '@components/Icons/Icons'
import { itemsUi } from './Data.ts'
import {
	BurgerMenuModel,
	ContentModel,
	SearchModel,
} from './UIModelComponents.tsx'

const UiModel: FC = () => {
	const randomItems = [...itemsUi].sort(() => Math.random() - 0.5).slice(0, 3)
	return (
		<div className='scena'>
			<div className='uimodel-container'>
				<div className='uimodel-screen-mobile'>
					<div className='screen-head'>
						<BurgerMenuModel />
						<Logo />
					</div>
					<div className='screen-content'>
						<div className='func-content'>
							<SearchModel />
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
						<ContentModel />
					</div>
				</div>
			</div>
			{randomItems.map((item, index) => (
				<div key={item.id} className={`air-file air-file-${index}`}>
					<div>{getFileIcon(item.extension)}</div>
				</div>
			))}
			<span className='air-file-draggable-cursor'>
				<ArrowPointer />
			</span>
			<div className='air-file-draggable-icon'>{getFileIcon('doc')}</div>
			<div className='air-file-draggable-drop-zone'>
				<ArrowUpFromBracket />
			</div>
		</div>
	)
}

export default UiModel
