import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userSelector } from '../Auth/redux/selectors'
import { logoutAction } from '../Auth/redux/actions'
import { Button } from '../../components'

const user = {
	fio: 'Админов Админ Админович',
	email: 'admin@mail.ru',
	phone: '8 900 000 00 00',
	country: 'Russia',
	city: 'Moskov',
	os: 'Android',
}

const Profile = ({ userData, logoutAction }) => {
	if (!userData) {
		userData = user
	}
	return (
		<div className="profile-page page">
			<div className="container">
				<h1 className="page-title">Ваш профиль</h1>
				<ul className="profile-list">
					<li className="profile-list__item">Имя: {userData.fio}</li>
					<li className="profile-list__item">E-mail: {userData.email}</li>
					<li className="profile-list__item">Телефон: {userData.phone}</li>
					<li className="profile-list__item">Страна: {userData.country}</li>
					<li className="profile-list__item">Город: {userData.city}</li>
					<li className="profile-list__item">OS: {userData.os}</li>
				</ul>
				<div className="profile-page__wrap-button">
					<Button onClick={() => logoutAction()}>Выйти</Button>
				</div>
			</div>
		</div>
	)
}

Profile.propTypes = {
	userData: PropTypes.object,
	logoutAction: PropTypes.func,
}

Profile.defaultProps = {
	userData: null,
	logoutAction: () => {},
}

export default connect((state) => ({ userData: userSelector(state) }), {
	logoutAction,
})(Profile)
