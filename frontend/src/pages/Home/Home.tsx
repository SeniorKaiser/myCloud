import Footer from '@widgets/Footer/Footer'
import Header from '@widgets/Header/Header'
import PrivilegeInfo from '@widgets/Privilege/Privilege'
import ReviewsSlider from '@widgets/ReviewsSlider/ReviewsSlider'
import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import './Home.css'
import Welcome from '@widgets/Welcome/Welcome'

const Home: React.FC = () => {
	const sectionsRef = useRef<(HTMLElement | null)[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.target instanceof HTMLElement) {
					if (entry.isIntersecting) {
						entry.target.classList.add('active')
					} else {
						entry.target.classList.remove('active')
					}
				}
			})
		})

		sectionsRef.current.forEach(section => {
			if (section) observer.observe(section)
		})

		return () => {
			sectionsRef.current.forEach(section => {
				if (section) observer.unobserve(section)
			})
		}
	}, [])

	return (
		<>
			<Header />
			<main className='home-main'>
				<section
					ref={el => (sectionsRef.current[0] = el)}
					className='welcome-container'
				>
					<Welcome />
					{/* <section className='wrapper'>
						<div className='hero'></div>
						<div className='content'></div>
					</section> */}
				</section>
				<section
					ref={el => (sectionsRef.current[1] = el)}
					className='privilege-container'
				>
					<h1>Что доступно всем?</h1>
					<PrivilegeInfo />
				</section>
				<section
					ref={el => (sectionsRef.current[2] = el)}
					className='reviews-container'
				>
					<h1>Что говорят другие?</h1>
					<ReviewsSlider />
				</section>
				{/* <section ref={el => (sectionsRef.current[3] = el)}>
					<h1>Популярные вопросы</h1>
					<AnswersQuestions />
				</section> */}
			</main>
			<Footer />
			<Toaster position='bottom-right' />
		</>
	)
}

export default Home
