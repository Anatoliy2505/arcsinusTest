import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.scss'

export const Button = ({
	className,
	disabled,
	children,
	onClick,
	active,
	...attr
}) => {
	const classes = classNames('btn', className, { active })

	const Tag = attr.to ? NavLink : 'button'

	const handleClick = (e) => {
		if (disabled) {
			e.preventDefault()
			return
		}
		onClick(e)
	}

	return (
		<Tag
			className={classes}
			disabled={disabled}
			onClick={handleClick}
			{...attr}
		>
			{children}
		</Tag>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
	active: PropTypes.bool,
}

Button.defaultProps = {
	className: '',
	disabled: false,
	children: 'Кнопка',
	onClick: () => {},
	active: false,
}
