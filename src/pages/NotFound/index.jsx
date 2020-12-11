import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.scss'

export const NotFound = () => {
	return (
		<section className={'page not-found-page'}>
			<div className="container">
				<div className={'not-found-page__container'}>
					<h1 className={'not-found-page__title'}>404</h1>
					<p className={'not-found-page__description'}>
						Извините, но страница не найдена
					</p>
					<Link to={'/'} className={'not-found-page__link'}>
						Вернуться на главную
					</Link>
				</div>
			</div>
		</section>
	)
}
