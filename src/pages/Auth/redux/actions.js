import * as t from './actionsTypes'
import * as api from '../../../utils/api/authApi'
import { checkResponse } from '../../../utils/helpers'

const ERROR_REQUEST_MSG = 'Не удалось отправить запрос на сервер'
const LS_ITEMS = ['user', 'checkNumber', 'check']

export const requestAction = () => ({
	type: t.REQUEST,
})

export const successAction = (userData) => ({
	type: t.SUCCESS,
	userData,
})

export const errorAction = (errorMsg) => ({
	type: t.ERROR_URI,
	errorMsg,
})

export const logoutAction = () => (dispatch) => {
	for (let item of LS_ITEMS) {
		localStorage.removeItem(item)
	}
	dispatch({ type: t.LOGOUT })
}

export const loginAction = (userData, toast = () => {}) => (dispatch) => {
	dispatch(requestAction())
	toast('Ваши данные отправляются!', { autoClose: 2000 })

	api
		.loginApi(userData)
		.then((res) => {
			if (checkResponse(res)) {
				dispatch(successAction(res.userData))

				localStorage.setItem('user', JSON.stringify(res.userData))
				localStorage.setItem('checkNumber', res.checkNumber)
				toast.info(`Код авторизации: ${res.checkNumber}`, {
					autoClose: 6000,
				})
				return
			} else {
				dispatch(errorAction(res.message))

				toast.error(
					res.message || 'Что-то пошло не так, не удалось Вас авторизовать!'
				)
				return
			}
		})
		.catch((e) => {
			dispatch(errorAction(ERROR_REQUEST_MSG))

			toast.error(ERROR_REQUEST_MSG)
		})
}

export const registrationAction = (userData, toast = () => {}) => (
	dispatch
) => {
	dispatch(requestAction())
	toast('Ваши данные отправляются!', { autoClose: 2000 })
	api
		.registrationApi(userData)
		.then((res) => {
			if (checkResponse(res)) {
				dispatch(successAction(res.userData))

				localStorage.setItem('user', JSON.stringify(res.userData))
				localStorage.setItem('checkNumber', res.checkNumber)
				toast.info(`Код авторизации: ${res.checkNumber}`, { autoClose: 6000 })
				return
			} else {
				dispatch(errorAction(res.message))

				toast.error(
					res.message || 'Что-то пошло не так, не удалось зарегистрировать!'
				)
				return
			}
		})
		.catch((e) => {
			dispatch(errorAction(ERROR_REQUEST_MSG))
			toast.error(ERROR_REQUEST_MSG)
		})
}

export const checkUserAction = (checkNumber, toast = () => {}) => (
	dispatch
) => {
	dispatch(requestAction())
	toast('Проверка кода!', { autoClose: 2000 })
	api
		.checkUserApi(checkNumber)
		.then((res) => {
			if (checkResponse(res)) {
				dispatch({
					type: t.CHECK,
				})
				localStorage.setItem('check', 'ok')
				return toast.success(res.message || 'Успех! Вы авторизованы!')
			} else {
				dispatch(logoutAction())
				return toast.error(res.message || 'Вы ввели неверный код')
			}
		})
		.catch((e) => {
			dispatch(errorAction(ERROR_REQUEST_MSG))
			toast.error(ERROR_REQUEST_MSG)
		})
}
