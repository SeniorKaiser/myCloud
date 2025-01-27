import React, { useEffect, useState } from 'react'
import Header from '@widgets/Header/Header'
import Footer from '@widgets/Footer/Footer'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import RegForm from '@widgets/RegForm/RegForm.tsx'
import './Reg.css'
import Loader from '@components/Loading/Loading'
import AuthUser from '@services/requests/AuthUser'
import { User } from '@app/data'

const Reg: React.FC = () => {
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
			<main className='reg-main'>
				<div className='reg-main__container'>
					<RegForm />
					<CardsSlider width='30rem' height='30rem' />
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Reg
