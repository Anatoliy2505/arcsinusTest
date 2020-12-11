import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const RouteWithTitle = ({ component: Component, title, ...rest }) => {
	useEffect(() => {
		if (title) {
			document.title = title
		}
	}, [title])

	return <Route {...rest} render={(props) => <Component {...props} />} />
}

RouteWithTitle.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.func,
		PropTypes.object,
	]),
	title: PropTypes.string,
}

RouteWithTitle.defaultProps = {
	title: '',
}
