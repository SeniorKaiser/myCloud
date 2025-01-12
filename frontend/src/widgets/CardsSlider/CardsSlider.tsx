import React, { useRef, useState, useEffect } from 'react'
import { sliderCards, Card } from './data.ts'
import { ChevronLeft, ChevronRight } from '@components/Icons/Icons.tsx'
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
	cards_in_row = 1,
}) => {
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [showLeftBtn, setShowLeftBtn] = useState(false)
	const [showRightBtn, setShowRightBtn] = useState(true)

	const handleScroll = (direction: 'prev' | 'next') => {
		if (sliderRef.current) {
			const slider = sliderRef.current as HTMLDivElement
			const cardWidth = slider.clientWidth

			if (direction === 'next') {
				slider.scrollLeft += cardWidth
			} else {
				slider.scrollLeft -= cardWidth
			}
		}
	}

	const checkScrollPosition = () => {
		if (!sliderRef.current) return
		const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current

		setShowLeftBtn(scrollLeft > 0)
		setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 1)
	}

	useEffect(() => {
		const slider = sliderRef.current
		if (!slider) return
		slider.addEventListener('scroll', checkScrollPosition)
		checkScrollPosition()
		return () => slider.removeEventListener('scroll', checkScrollPosition)
	}, [])

	return (
		<div className='slider-wrapper' style={{ width: width, height: height }}>
			{showLeftBtn && (
				<button
					className='slider-btn left'
					onClick={() => handleScroll('prev')}
				>
					<ChevronLeft />
				</button>
			)}

			<div className='slider' ref={sliderRef}>
				{cards.map(card => (
					<div
						className='slider__card'
						key={card.id}
						style={{
							flex: `0 0 calc(calc((100% - (${cards_in_row} - 1) * 0.6rem) / ${cards_in_row}))`,
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
			{showRightBtn && (
				<button
					className='slider-btn right'
					onClick={() => handleScroll('next')}
				>
					<ChevronRight />
				</button>
			)}
		</div>
	)
}

export default CardsSlider
