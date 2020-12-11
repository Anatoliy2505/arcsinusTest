import * as t from './actionsTypes'

export const initialState = {
	isAuth: !!localStorage.getItem('user') || false,
	userData: !!localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,
	errorMsg: '',
	isCheked: !!localStorage.getItem('check') || false,
}

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case t.REQUEST:
			return {
				...state,
				isLoading: true,
				errorMsg: '',
			}
		case t.SUCCESS:
			return {
				...state,
				isAuth: true,
				userData: action.userData,
				isLoading: false,
			}
		case t.CHECK:
			return {
				...state,
				isLoading: false,
				isCheked: true,
			}
		case t.LOGOUT:
			return {
				isAuth: false,
				userData: null,
				errorMsg: '',
				isCheked: false,
			}
		case t.ERROR_URI:
			return {
				...state,
				isLoading: false,
				errorMsg: action.errorMsg,
			}
		default:
			return state
	}
}
