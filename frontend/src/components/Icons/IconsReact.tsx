import {
	FaFileImage,
	FaFilePdf,
	FaFileWord,
	FaFileExcel,
	FaFileArchive,
	FaFileVideo,
	FaFileAudio,
	FaFileAlt,
	FaFolder,
} from 'react-icons/fa'

export const getFileIcon = (
	extension: string | undefined | null
): JSX.Element => {
	const icons = {
		jpg: <FaFileImage color='#4CAF50' />,
		jpeg: <FaFileImage color='#4CAF50' />,
		png: <FaFileImage color='#4CAF50' />,
		gif: <FaFileImage color='#4CAF50' />,
		svg: <FaFileImage color='#4CAF50' />,

		pdf: <FaFilePdf color='#E53935' />,

		doc: <FaFileWord color='#1E88E5' />,
		docx: <FaFileWord color='#1E88E5' />,

		xls: <FaFileExcel color='#388E3C' />,
		xlsx: <FaFileExcel color='#388E3C' />,

		zip: <FaFileArchive color='#8E24AA' />,
		rar: <FaFileArchive color='#8E24AA' />,

		mp4: <FaFileVideo color='#D84315' />,
		mov: <FaFileVideo color='#D84315' />,
		avi: <FaFileVideo color='#D84315' />,

		mp3: <FaFileAudio color='#D84315' />,
		wav: <FaFileAudio color='#D84315' />,

		folder: <FaFolder color='#FB8C00' />,

		default: <FaFileAlt color='#757575' />,
	}
	return icons[extension as keyof typeof icons] ?? icons['default']
}

const FileIcon = (fileUrl: string) => {
	const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(fileUrl)

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			{isImage ? (
				<img
					src={fileUrl}
					alt='file'
					style={{
						width: '50px',
						height: '50px',
						objectFit: 'cover',
						borderRadius: '5px',
					}}
				/>
			) : (
				<span style={{ fontSize: '30px' }}>{getFileIcon(fileUrl)}</span>
			)}
			<span>{fileUrl.split('/').pop()}</span>
		</div>
	)
}

export default FileIcon
