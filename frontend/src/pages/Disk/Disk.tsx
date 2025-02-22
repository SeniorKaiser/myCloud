import React from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import { useParams } from 'react-router-dom'
import Storage from '@widgets/Storage/Storage'
import { Toaster } from 'react-hot-toast'
import './Disk.css'

const Disk: React.FC = () => {
	const { id } = useParams()
	return (
		<>
			<Header />
			<main className='disk-main'>
				<Storage folder_id={id} />
			</main>
			<Footer />
			<Toaster position='bottom-right' />
		</>
	)
}

export default Disk
