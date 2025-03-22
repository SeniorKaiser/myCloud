import { FC, ReactNode } from 'react'
import './Switcher.css'

interface SwitcherProps {
	setActive: (active: boolean) => void
	childrenRight: ReactNode
	childrenLeft: ReactNode
}

const Switcher: FC<SwitcherProps> = ({
	setActive,
	childrenRight,
	childrenLeft,
}) => {
	return (
		<div className='switcher'>
			<button onClick={() => setActive(false)}>{childrenRight}</button>
			<button onClick={() => setActive(true)}>{childrenLeft}</button>
		</div>
	)
}

export default Switcher
