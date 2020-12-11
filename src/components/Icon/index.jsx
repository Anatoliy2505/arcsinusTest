import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Icon.scss'

export const Icon = ({ name, size, className, onClick, disabled, ...attr }) => {
	const iconSize = size ? { fontSize: `${size}em` } : null
	const classes = classNames(
		className,
		'icon',
		'fa',
		`fa-${name}`,
		{ func: onClick },
		{ disabled }
	)
	return (
		<i
			className={classes}
			onClick={disabled ? null : onClick}
			style={iconSize}
			{...attr}
		/>
	)
}

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.number,
	className: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
}

Icon.defaultProps = {
	name: '',
	className: '',
	size: null,
	onClick: null,
	disabled: false,
}
