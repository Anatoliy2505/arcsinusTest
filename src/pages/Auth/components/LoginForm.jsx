import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reduxForm, Field } from 'redux-form'
import { FormItem, Button } from '../../../components'
import { loginFormValidator as validate } from '../../../utils/validators/validateLoginForm'

const LoginReduxForm = ({
	isLoading,
	loginAction,
	handleSubmit,
	submitting,
	valid,
}) => {
	const submitForm = (value) => {
		loginAction(value, toast)
	}

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			action={'post'}
			className={'auth-form'}
		>
			<h1 className={'auth-form__title'}>Войдите в свой профиль</h1>
			<Field
				component={FormItem}
				type={'email'}
				name={'email'}
				label={'Логин'}
				placeholder={'Введите email'}
				isFocus={true}
			/>
			<Field
				component={FormItem}
				type={'password'}
				name={'password'}
				label={'Пароль'}
				placeholder={'Введите пароль'}
			/>

			<div className={'auth-form__wrap-button'}>
				<Button
					type={'submit'}
					className={'auth-btn'}
					disabled={submitting || !valid || isLoading}
				>
					Войти
				</Button>
			</div>

			<div className={'auth-form__wrap-redirect'}>
				<Link to={'/registration'} className={'auth-form__redirect-link'}>
					Я забыл пароль
				</Link>
				<Link to={'/registration'} className={'auth-form__redirect-link'}>
					Регистрация
				</Link>
			</div>
		</form>
	)
}

export const LoginForm = reduxForm({ form: 'login', validate })(LoginReduxForm)

LoginForm.propTypes = {
	isLoading: PropTypes.bool,
	loginAction: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func,
	submitting: PropTypes.bool.isRequired,
	valid: PropTypes.bool.isRequired,
}

LoginForm.defaultProps = {
	isLoading: false,
	submitting: false,
	valid: false,
}
