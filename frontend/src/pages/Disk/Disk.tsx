import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import { useParams } from 'react-router-dom'
import StorageInfo from '@widgets/StorageInfo/StorageInfo'
import Storage from '@widgets/Storage/Storage'
import './Disk.css'

const Disk: React.FC = () => {
	const { id } = useParams()
	return (
		<>
			<Header />
			<main className='disk-main'>
				<StorageInfo />
				<Storage folder_id={id} />
			</main>
			<Footer />
		</>
	)
}

export default Disk
