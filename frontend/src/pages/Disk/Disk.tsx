import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import StorageInfo from '@widgets/StorageInfo/StorageInfo'
import Storage from '@widgets/Storage/Storage'
import './Disk.css'

const Disk: React.FC = () => {
	return (
		<>
			<Header />
			<main className='disk-main'>
				<StorageInfo />
				<Storage />
			</main>
			<Footer />
		</>
	)
}

export default Disk
