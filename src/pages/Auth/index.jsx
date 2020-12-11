import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Redirect, Switch } from 'react-router'
import {
	isAuthSelector,
	isCheckedSelector,
	isLoadingSelector,
} from './redux/selectors'
import { loginAction, registrationAction } from './redux/actions'
import { LoginForm, RegistrationForm } from './components'
import './Auth.scss'
import { NotFound } from '../NotFound'

const Auth = ({
	isAuth,
	isChecked,
	isLoading,
	loginAction,
	registrationAction,
}) => {
	if (isAuth) {
		if (isChecked) {
			return <Redirect to={'/profile'} />
		} else {
			return <Redirect to={'/check'} />
		}
	}

	return (
		<div className="auth-page page">
			<div className="container">
				<Switch>
					<Route
						path={['/', '/login']}
						exact={true}
						render={() => (
							<LoginForm loginAction={loginAction} isLoading={isLoading} />
						)}
					/>
					<Route
						path={'/registration'}
						exact={true}
						render={() => (
							<RegistrationForm
								registrationAction={registrationAction}
								isLoading={isLoading}
							/>
						)}
					/>
					<NotFound />
				</Switch>
			</div>
		</div>
	)
}

Auth.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	isChecked: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	loginAction: PropTypes.func.isRequired,
	registrationAction: PropTypes.func.isRequired,
}

Auth.defaultProps = {
	isAuth: false,
	isChecked: false,
	isLoading: false,
}

export default connect(
	(state) => ({
		isAuth: isAuthSelector(state),
		isChecked: isCheckedSelector(state),
		isLoading: isLoadingSelector(state),
	}),
	{ loginAction, registrationAction }
)(Auth)
