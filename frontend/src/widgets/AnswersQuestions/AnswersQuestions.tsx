import React, { useState } from 'react'
import { questionList } from './data'
import { Plus, XMark } from '@components/Icons/Icons'
import './AnswersStyles.css'

const AnswersQuestions: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleAnswer = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className='answers-questions'>
			{questionList.map((el, index) => (
				<div
					className='answers-questions-block'
					key={index}
					onClick={() => toggleAnswer(index)}
				>
					<div className='answers-questions-block-head'>
						<h2 className={openIndex === index ? 'active' : ''}>
							{openIndex === index ? <XMark /> : <Plus />}
						</h2>
						{''}
						<h2>{el.question}</h2>
					</div>
					{openIndex === index && <p>{el.answer}</p>}
				</div>
			))}
		</div>
	)
}

export default AnswersQuestions
