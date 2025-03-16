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
	FaFilePowerpoint,
	FaFileCsv,
} from 'react-icons/fa'
import { FaFileCode, FaJs } from 'react-icons/fa6'

export const getFileIcon = (
	extension: string | undefined | null
): JSX.Element => {
	const icons = {
		// Image files
		jpg: <FaFileImage color='#4CAF50' />,
		jpeg: <FaFileImage color='#4CAF50' />,
		png: <FaFileImage color='#4CAF50' />,
		gif: <FaFileImage color='#4CAF50' />,
		svg: <FaFileImage color='#4CAF50' />,

		// Document files
		pdf: <FaFilePdf color='#E53935' />,
		pptx: <FaFilePowerpoint color='#F44336' />,
		doc: <FaFileWord color='#1E88E5' />,
		docx: <FaFileWord color='#1E88E5' />,
		txt: <FaFileAlt color='#9E9E9E' />,
		csv: <FaFileCsv color='#FF9800' />,

		// Spreadsheet files
		xls: <FaFileExcel color='#388E3C' />,
		xlsx: <FaFileExcel color='#388E3C' />,

		// Archive files
		zip: <FaFileArchive color='#8E24AA' />,
		rar: <FaFileArchive color='#8E24AA' />,
		tar: <FaFileArchive color='#8E24AA' />,
		gz: <FaFileArchive color='#8E24AA' />,
		bz2: <FaFileArchive color='#8E24AA' />,

		// Video files
		mp4: <FaFileVideo color='#D84315' />,
		mov: <FaFileVideo color='#D84315' />,
		avi: <FaFileVideo color='#D84315' />,
		mkv: <FaFileVideo color='#D84315' />,
		flv: <FaFileVideo color='#D84315' />,

		// Audio files
		mp3: <FaFileAudio color='#D84315' />,
		wav: <FaFileAudio color='#D84315' />,
		ogg: <FaFileAudio color='#D84315' />,
		flac: <FaFileAudio color='#D84315' />,

		// Folder
		folder: <FaFolder color='#FB8C00' />,

		// Code files
		js: <FaFileCode color='#f0d91d' />,
		ts: <FaFileCode color='#2196F3' />,
		html: <FaFileCode color='#FF5722' />,
		css: <FaFileCode color='#FF5722' />,
		php: <FaFileCode color='#607D8B' />,
		java: <FaFileCode color='#FFC107' />,
		py: <FaFileCode color='#8E24AA' />,
		rb: <FaFileCode color='#9C27B0' />,
		go: <FaFileCode color='#00BCD4' />,

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
