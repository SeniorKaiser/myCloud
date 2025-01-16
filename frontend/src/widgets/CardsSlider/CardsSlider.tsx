import React, { useRef, useState, useEffect } from 'react'
import { sliderCards, Card } from './data.ts'
import './CardsSlider.css'

interface CardsSliderProps {
	width: string | undefined
	height?: string | undefined
	cards?: Card[] | undefined
	cards_in_row?: number | undefined
}

const CardsSlider: React.FC<CardsSliderProps> = ({
	width,
	height,
	cards = sliderCards,
}) => {
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	useEffect(() => {
		const updateActiveDot = () => {
			if (sliderRef.current) {
				const index = Math.round(
					sliderRef.current.scrollLeft / sliderRef.current.clientWidth
				)
				setActiveIndex(index)
			}
		}

		const slider = sliderRef.current
		if (!slider) return

		slider.addEventListener('scroll', updateActiveDot)
		return () => slider.removeEventListener('scroll', updateActiveDot)
	}, [])

	return (
		<div className='slider-wrapper' style={{ width: width, height: height }}>
			<div className='slider' ref={sliderRef}>
				{cards.map(card => (
					<div
						className='slider__card'
						key={card.id}
						style={{
							flex: `0 0 100%`,
						}}
					>
						{card.img_path ? (
							<img src={card.img_path} alt={card.title} />
						) : undefined}
						<h2>{card.title}</h2>
						<p>{card.description}</p>
					</div>
				))}
			</div>
			<div className='slider-dots'>
				{cards.map((_, index) => (
					<button
						key={index}
						className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
						onClick={() => {
							if (sliderRef.current) {
								sliderRef.current.scrollLeft =
									index * sliderRef.current.clientWidth
							}
						}}
					></button>
				))}
			</div>
		</div>
	)
}

export default CardsSlider
