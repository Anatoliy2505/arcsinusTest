import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { reduxForm, Field } from 'redux-form'
import { FormItem, Button, AutocompleteFormItem } from '../../../components'
import { validateRegForm as validate } from '../../../utils/validators/validateRegForm'
import { getCountriesAndCities } from '../../../utils/helpers'

const data = getCountriesAndCities()

const RegistrationReduxForm = ({
	data,
	isLoading,
	registrationAction,
	handleSubmit,
	submitting,
	valid,
}) => {
	const [dataFromObj, setDataFromObj] = useState(null)
	const [cities, setCities] = useState([])

	useEffect(() => {
		if (data) {
			setDataFromObj(data)
			setCities(data.cities)
		}
	}, [data])

	const getCountry = useCallback(
		(country) => {
			if (!!dataFromObj && country in dataFromObj.allData) {
				setCities(dataFromObj.allData[country])
			}
		},
		[dataFromObj]
	)

	const submitForm = (body) => {
		registrationAction(body, toast)
	}

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			action={'post'}
			className={'auth-form'}
		>
			<h1 className={'auth-form__title'}>Регистрация</h1>
			<Field
				component={FormItem}
				name={'fio'}
				label={'ФИО'}
				placeholder={'Иванов Иван Иванович'}
				isFocus={true}
			/>
			<Field
				component={FormItem}
				type={'email'}
				name={'email'}
				label={'E-mail'}
				placeholder={'Введите email'}
			/>
			<Field
				component={FormItem}
				type={'tel'}
				name={'phone'}
				label={'Телефон'}
				placeholder={'8(900) 00 00 00'}
			/>
			<Field
				component={AutocompleteFormItem}
				name={'country'}
				label={'Страна'}
				placeholder={'Россия'}
				fn={getCountry}
				items={dataFromObj ? dataFromObj.countries : []}
			/>
			<Field
				component={AutocompleteFormItem}
				name={'city'}
				label={'Город'}
				placeholder={'Москва'}
				items={dataFromObj ? cities : []}
			/>
			<Field
				component={FormItem}
				name={'os'}
				label={'ОС Вашего телефона'}
				placeholder={'Андроид'}
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
					className={'auth-btn'}
					disabled={submitting || !valid || isLoading}
				>
					Зарегистрироваться
				</Button>
			</div>

			<div className={'auth-form__wrap-redirect'}>
				<Link to={'/login'} className={'auth-form__redirect-link'}>
					Войти в свой профиль
				</Link>
			</div>
		</form>
	)
}

export const RegistrationForm = reduxForm({ form: 'registration', validate })(
	RegistrationReduxForm
)

RegistrationForm.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	isLoading: PropTypes.bool,
	registrationAction: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func,
	submitting: PropTypes.bool.isRequired,
	valid: PropTypes.bool.isRequired,
}

RegistrationForm.defaultProps = {
	data: data || null,
	isLoading: false,
	submitting: false,
	valid: false,
}
