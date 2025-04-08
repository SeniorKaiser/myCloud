import Footer from '@widgets/Footer/Footer'
import Header from '@widgets/Header/Header'
import PrivilegeInfo from '@widgets/Privilege/Privilege'
import ReviewsSlider from '@widgets/ReviewsSlider/ReviewsSlider'
import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import './Home.css'
import AnswersQuestions from '@widgets/AnswersQuestions/AnswersQuestions'
import Logo from '@components/Logo/Logo'

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
					{/* <section className='wrapper'>
						<div className='hero'></div>
						<div className='content'></div>
					</section> */}
					<div className='welcome-container__picture'>
						<picture>
							<source
								srcSet='/demo-home-mobile.webp'
								media='(max-width: 35rem)'
							/>
							<source srcSet='/demo-home.webp' media='(min-width: 35rem)' />
							<img src='/demo-home.webp' loading='lazy' alt='Demo Home' />
						</picture>
					</div>
					<div className='welcome-container__content'>
						<h1>The future starts from this point</h1>
						<p>
							Освободите место на своих устройствах и сохраните важные файлы в
							безопасности с помощью нашего облачного хранилища.
						</p>
						<button
							onClick={() => {
								window.location.href = './reg'
							}}
						>
							Зарегистрироваться
						</button>
					</div>
					<div className='welcome-container__logo'>
						<Logo />
					</div>
					{/* <Welcome /> */}
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

				<section ref={el => (sectionsRef.current[3] = el)}>
					<h1>Популярные вопросы</h1>
					<AnswersQuestions />
				</section>
			</main>
			<Footer />
			<Toaster position='bottom-right' />
		</>
	)
}

export default Home
