import React, { useState, useEffect } from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import StorageInfo from '@widgets/StorageInfo/StorageInfo'
import Storage from '@widgets/Storage/Storage'
import { User } from '@app/data'
import AuthUser from '@services/requests/AuthUser'
import Loader from '@components/Loading/Loading'
import './Disk.css'

const Disk: React.FC = () => {
	const [user, setUser] = useState<User | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user_fetched = await AuthUser()
				if (user_fetched) {
					setUser(user_fetched)
				} else {
					setUser(undefined)
				}
			} catch (error) {
				setUser(undefined)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<>
			<Header User={user} />
			<main className='disk-main'>
				<StorageInfo />
				<Storage />
			</main>
			<Footer />
		</>
	)
}

export default Disk
