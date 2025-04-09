import React from 'react'
import { listPrivilegeCard, QuestionsPricing } from './Data'
import { Check } from '@components/Icons/Icons'
import './Privilege.css'
import AnswersQuestions from '@widgets/AnswersQuestions/AnswersQuestions'

const PrivilegeInfo: React.FC = () => {
	return (
		<div className='privilege-container'>
			<div className='privilege-content'>
				<div className='privilege-description'>
					<h1>Вопросы</h1>
					<AnswersQuestions questions={QuestionsPricing} />
					<div className='difference'>
						<h1>Разница с конкурентами</h1>
						<div className='company-privilege'>
							<div className='company-card'>
								<img src='google-disk.svg' />
								<span>15 ГБ</span>
							</div>
							<div className='company-card'>
								<img src='yandex-disk.svg' />
								<span>5 ГБ</span>
							</div>
							<div className='company-card'>
								<img src='mailru.svg' />
								<span>8 ГБ</span>
							</div>
						</div>
					</div>
				</div>
				<div className='privilege-cards-container'>
					{listPrivilegeCard.map((data, id) => (
						<div className='privilege-card' key={id}>
							<div className='privilege-card-content'>
								<h2>{data.title}</h2>
								<h5>{data.subtitle}</h5>
								<ul className='privilege-card__description'>
									{data.description.map((features, idx) => (
										<li key={idx}>
											<Check /> {features.title} {features.description}
										</li>
									))}
								</ul>
							</div>
							<p className='privilege-card-buy'>
								<button onClick={data.action}>Начать</button>
								<div>{data.price}₽ / месяц</div>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PrivilegeInfo
