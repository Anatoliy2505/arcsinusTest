import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router'
import {
	isAuthSelector,
	isCheckedSelector,
	isLoadingSelector,
} from '../Auth/redux/selectors'
import { logoutAction, checkUserAction } from '../Auth/redux/actions'
import { FormItem, Button } from '../../components'

import '../Auth/Auth.scss'

const CheckUser = ({
	isAuth,
	isCheked,
	isLoading,
	checkUserAction,
	logoutAction,
}) => {
	const [code, setCode] = useState('')

	if (!isAuth) {
		return <Redirect to={'/'} />
	} else if (isCheked) {
		return <Redirect to={'/profile'} />
	}

	const submitForm = (e) => {
		e.preventDefault()
		checkUserAction(code, toast)
	}

	const handleChange = (e) => {
		const val = e.currentTarget.value
		setCode(val)
	}

	const logout = (e) => {
		e.preventDefault()
		logoutAction()
	}

	return (
		<div className="auth-page page">
			<div className="container">
				<form action="post" className="auth-form">
					<h1 className="auth-form__title">Войдите в свой профиль</h1>

					<FormItem
						name="check"
						type="number"
						label="Введите код авторизации"
						onChange={handleChange}
						isFocus={true}
						value={code}
					/>

					<div className="auth-form__wrap-button auth-form__wrap-button_flex">
						<Button onClick={logout}>Назад</Button>
						<Button disabled={!code || isLoading} onClick={submitForm}>
							Отправить
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default connect(
	(state) => ({
		isAuth: isAuthSelector(state),
		isCheked: isCheckedSelector(state),
		isLoading: isLoadingSelector(state),
	}),
	{ logoutAction, checkUserAction }
)(CheckUser)

CheckUser.propTypes = {
	isAuth: PropTypes.bool,
	isLoading: PropTypes.bool,
	isCheked: PropTypes.bool,
	checkUserAction: PropTypes.func.isRequired,
	logoutAction: PropTypes.func.isRequired,
}

CheckUser.defaultProps = {
	isAuth: false,
	isLoading: false,
	isCheked: false,
}
