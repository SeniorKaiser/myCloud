// import { useEffect, useRef, useState } from 'react'
// import './Timeline.css'

// const events = [
// 	{ id: 1, title: 'Событие 1', description: 'Описание события 1' },
// 	{ id: 2, title: 'Событие 2', description: 'Описание события 2' },
// 	{ id: 3, title: 'Событие 3', description: 'Описание события 3' },
// ]

// const Timeline = () => {
// 	const [scrollY, setScrollY] = useState(0)

// 	useEffect(() => {
// 		const handleScroll = () => {
// 			setScrollY(window.scrollY)
// 		}
// 		window.addEventListener('scroll', handleScroll)
// 		return () => window.removeEventListener('scroll', handleScroll)
// 	}, [])

// 	return (
// 		<div className='timeline'>
// 			{events.map((event, index) => {
// 				return (
// 					<div className={`card visible`} key={index}>
// 						<div className='card-progress'>
// 							<div className='card-progress_dot'></div>
// 							<div className='card-bar'>
// 								<div
// 									className='card-bar__fill'
// 									style={{
// 										transform: `translateY(${0 + scrollY}px)`,
// 										transition: 'transform 0.3s ease-out',
// 									}}
// 								></div>
// 							</div>
// 						</div>
// 						<div className='info'>
// 							<h2 className='title'>{event.title}</h2>
// 							<p>{event.description}</p>
// 						</div>
// 					</div>
// 				)
// 			})}
// 		</div>
// 	)
// }

// export default Timeline
