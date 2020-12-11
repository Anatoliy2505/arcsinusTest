import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'

import './Footer.scss'

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<NavLink to={'/'} className={'footer-help'}>
					<Icon className="far footer-help__icon" name="envelope" />{' '}
					<span className={'footer-help__text'}>Написать в поддержку</span>
				</NavLink>
			</div>
		</footer>
	)
}
