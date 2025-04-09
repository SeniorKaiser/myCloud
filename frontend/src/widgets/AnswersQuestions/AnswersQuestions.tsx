import React, { useState } from 'react'
import { Question, questionList } from './data'
import { Plus, XMark } from '@components/Icons/Icons'
import './AnswersStyles.css'

export interface AnswersQuestionsProps {
	questions: Question[]
}

const AnswersQuestions: React.FC<AnswersQuestionsProps> = ({
	questions = questionList,
}) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleAnswer = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<div className='answers-questions'>
			{questions.map((el, index) => (
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
					<p className={openIndex === index ? 'open' : 'close'}>{el.answer}</p>
					{/* {openIndex === index && } */}
				</div>
			))}
		</div>
	)
}

export default AnswersQuestions
