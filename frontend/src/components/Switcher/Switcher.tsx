import { FC, ReactNode, useEffect } from 'react'
import './Switcher.css'

interface SwitcherProps {
	firstAction: () => void
	secondAction: () => void
	childrenRight: ReactNode
	childrenLeft: ReactNode
	startAction: () => void
}

const Switcher: FC<SwitcherProps> = ({
	firstAction,
	secondAction,
	childrenRight,
	childrenLeft,
	startAction,
}) => {
	useEffect(startAction, [])

	return (
		<div className='switcher'>
			<button onClick={firstAction}>{childrenRight}</button>
			<button onClick={secondAction}>{childrenLeft}</button>
		</div>
	)
}

export default Switcher
