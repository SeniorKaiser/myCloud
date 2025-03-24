import { File, Folder } from '@app/data'
import { FC } from 'react'
import { getFileIcon } from '@components/Icons/IconsReact'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './ObjectCard.css'
import ListOptions from '@components/ListOptions/ListOptions'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
} from '@widgets/Storage/Data'

interface ObjectCardProps {
	object: File | Folder
	onSuccess: () => void
}

const ObjectCard: FC<ObjectCardProps> = ({ object }) => {
	return (
		<div className='object-card'>
			<div className='object-icon'>
				{'extension' in object
					? getFileIcon(object.extension)
					: getFileIcon('folder')}
			</div>
			<div className='object-card_info'>
				<div>
					<span>Имя:</span> {object.name}
				</div>
				<div>
					<span>Дата:</span> {formatDate(object.date)}
				</div>

				{'extension' in object && (
					<>
						<div>
							<span>Размер:</span> {formatFileSize(object.size)}
						</div>
						<div>
							<span>Расширение:</span> {object.extension}
						</div>
					</>
				)}
			</div>
			<ListOptions
				options={'size' in object ? FileOption : FolderOption}
				onSuccess={() => {}}
				object={object}
			/>
		</div>
	)
}

export default ObjectCard
