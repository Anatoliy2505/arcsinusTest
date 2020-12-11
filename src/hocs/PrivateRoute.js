import React, { useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	isAuthSelector,
	isCheckedSelector,
} from '../pages/Auth/redux/selectors'

const PrivateRoure = ({
	component: Component,
	title,
	isAuth,
	isChecked,
	...rest
}) => {
	const location = useLocation()

	useEffect(() => {
		if (title) {
			document.title = title
		}
	}, [title])

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth && isChecked ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { prevLocation: location.pathname },
						}}
					/>
				)
			}
		/>
	)
}

export default connect((state) => ({
	isAuth: isAuthSelector(state),
	isChecked: isCheckedSelector(state),
}))(PrivateRoure)

PrivateRoure.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.func,
		PropTypes.object,
	]),
	isAuth: PropTypes.bool.isRequired,
	title: PropTypes.string,
}

PrivateRoure.defaultProps = {
	isAuth: false,
	title: '',
}
