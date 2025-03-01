import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import Storage from '@widgets/Storage/Storage'
import { Toaster } from 'react-hot-toast'
import './Disk.css'

const Disk: React.FC = () => {
	return (
		<>
			<Header />
			<main className='disk-main'>
				<Storage />
			</main>
			<Footer />
			<Toaster position='bottom-right' />
		</>
	)
}

export default Disk
