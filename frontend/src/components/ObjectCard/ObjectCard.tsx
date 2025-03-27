import { File, Folder, isFile, isImage } from '@app/data'
import { FC, useEffect, useState } from 'react'
import { getFileIcon } from '@components/Icons/IconsReact'
import formatDate from '@services/functions/formatDate'
import formatFileSize from '@services/functions/formatSize'
import './ObjectCard.css'
import ListOptions from '@components/ListOptions/ListOptions'
import {
	FileOptionsContextMenu as FileOption,
	FolderOptionsContextMenu as FolderOption,
} from '@widgets/Storage/Data'
import getImage from '@services/requests/getFileImage'

interface ObjectCardProps {
	object: File | Folder
	onSuccess: () => void
}

const ObjectCard: FC<ObjectCardProps> = ({ object, onSuccess }) => {
	const [image, setImage] = useState<string | undefined>(undefined)

	useEffect(() => {
		const fetchImage = async () => {
			if (!isFile(object) || !isImage(object.extension)) {
				setImage(undefined)
				return
			}
			const url = await getImage(object.id)
			setImage(url)
		}
		fetchImage()
	}, [object])

	return (
		<div className='object-card'>
			{/* <div className='object-icon'>
				{'extension' in object
					? getFileIcon(object.extension)
					: getFileIcon('folder')}
			</div> */}
			{isFile(object) ? (
				isImage(object.extension) && image ? (
					<img
						key={object.id}
						src={image || ''}
						alt='file preview'
						className='object-preview'
						loading='lazy'
					/>
				) : (
					<div className='object-icon'>{getFileIcon(object.extension)}</div>
				)
			) : (
				<div className='object-icon'>{getFileIcon('folder')}</div>
			)}
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
				onSuccess={onSuccess}
				object={object}
			/>
		</div>
	)
}

export default ObjectCard
