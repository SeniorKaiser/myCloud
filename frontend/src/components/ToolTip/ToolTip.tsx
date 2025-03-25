import { FC, ReactNode } from 'react'
import './ToolTip.css'

interface ToopTipProps {
	children: ReactNode
	text: string
}

const ToolTip: FC<ToopTipProps> = ({ children, text }) => {
	return (
		<div className='tooltip-container'>
			<div className='tooltip-children'>
				{children}
				<div className='tooltip'>
					<span>{text}</span>
				</div>
			</div>
		</div>
	)
}

export default ToolTip
