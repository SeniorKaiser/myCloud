import './ReviewsStyles.css'
import React, { useRef } from 'react'
import { reviewsList } from './data'
import { ChevronLeft, ChevronRight, Star } from '@components/Icons/Icons'

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
		<div className='reviews'>
			<div className='reviews-control'>
				<button onClick={() => scrollSlider('left')}>
					<ChevronLeft />
				</button>
				<button onClick={() => scrollSlider('right')}>
					<ChevronRight />
				</button>
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
	)
}

export default ReviewsSlider
