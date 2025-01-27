import React, { useState, useEffect } from 'react'
import Header from '@widgets/Header/Header.tsx'
import Footer from '@widgets/Footer/Footer.tsx'
import Welcome from '@widgets/Welcome/Welcome'
import CardsSlider from '@widgets/CardsSlider/CardsSlider'
import PrivilegeInfo from '@widgets/Privilege/Privilege'
import { User } from '@app/data'
import AuthUser from '@services/requests/AuthUser'
import Loader from '@components/Loading/Loading'
import './Home.css'

const Home: React.FC = () => {
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
		return <Loader /> // Показываем лоадер, пока идет загрузка
	}

	return (
		<>
			<Header User={user} />
			<main className='home-main'>
				<section className='welcome-container'>
					<Welcome />
					<div className='features-container' style={{ height: '15rem' }}>
						<CardsSlider
							width='min(100%, 60rem)'
							height='100%'
							cards_in_row={2}
						/>
					</div>
				</section>
				<section className='privilege-container'>
					<h1>Privilege</h1>
					<PrivilegeInfo />
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Home
