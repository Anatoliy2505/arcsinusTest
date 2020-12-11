import { request, registration, login, checkUser } from '../helpers'

export const loginApi = (data) => request(login, data)
export const registrationApi = (data) => request(registration, data)
export const checkUserApi = (data) => request(checkUser, data)
