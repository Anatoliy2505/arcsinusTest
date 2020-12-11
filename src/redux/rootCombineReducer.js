import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { auth } from '../pages/Auth/redux/reducer'

export default combineReducers({
	form,
	auth,
})
