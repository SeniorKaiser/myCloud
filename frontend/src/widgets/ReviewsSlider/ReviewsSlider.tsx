import './ReviewsStyles.css'
import React, { useRef } from 'react'
import { reviewsList } from './data'
import { ChevronLeft, ChevronRight, Star } from '@components/Icons/Icons'
import AnswersQuestions from '@widgets/AnswersQuestions/AnswersQuestions'
import { ReviewsQuestions } from './data'
import ToolTip from '@components/ToolTip/ToolTip'

const ReviewsSlider: React.FC = () => {
	const sliderRef = useRef<HTMLUListElement>(null)

	const scrollSlider = (direction: 'left' | 'right') => {
		if (sliderRef.current) {
			const scrollAmount = sliderRef.current.children[0]?.clientWidth || 200
			sliderRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}
	return (
		<div className='reviews-container'>
			<div className='reviews-description'>
				<h1>Вопросы</h1>
				<AnswersQuestions questions={ReviewsQuestions} />
				<h1>Социальные сети</h1>
				<div className='social-links'>
					<a href='https://t.me/+noZDMTDugVwwM2Vi'>
						<ToolTip text='Telegram'>
							<img src='telegram.svg' />
						</ToolTip>
					</a>
				</div>
			</div>
			<div className='reviews'>
				<div className='reviews-control'>
					<ToolTip text='Назад'>
						<button onClick={() => scrollSlider('left')}>
							<ChevronLeft />
						</button>
					</ToolTip>
					<ToolTip text='Вперёд'>
						<button onClick={() => scrollSlider('right')}>
							<ChevronRight />
						</button>
					</ToolTip>
				</div>
				<div className='reviews-wrapper'>
					<ul ref={sliderRef} className='reviews-slider'>
						{reviewsList.map((el, index) => (
							<li key={index} className='slider-block'>
								<h1>{el.name}</h1>
								<div className='slider-block-stars'>
									{Array.from({ length: el.stars }).map(_ => (
										<Star />
									))}
								</div>
								<p>{el.text}</p>
								<p>{el.contact}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ReviewsSlider
