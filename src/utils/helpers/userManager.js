const users = [
	{
		fio: 'Админов Админ Админович',
		email: 'admin@mail.ru',
		phone: '8 900 000 00 00',
		country: 'Russia',
		city: 'Moskov',
		os: 'Android',
		password: '123456',
	},
]

const getUsers = () => {
	let allUsers = users
	if (localStorage.getItem('users') === null) {
		localStorage.setItem('users', JSON.stringify(allUsers))
	} else {
		allUsers = JSON.parse(localStorage.getItem('users'))
	}
	return allUsers
}

const isIssetUser = (users, email) => {
	const user = users.find((item) => item.email === email)
	if (user) {
		return user
	} else {
		return false
	}
}

const getCheckNumber = () => {
	return Math.ceil(Math.random() * (9999 - 1000) + 1000)
}

export const registration = (user) => {
	const users = getUsers()
	const checkNumber = getCheckNumber()
	if (!!isIssetUser(users, user.email)) {
		return JSON.stringify({
			ok: false,
			message: `Пользователь с E-mail "${user.email}" уже существует`,
		})
	} else {
		localStorage.setItem('users', JSON.stringify([...users, user]))
		return JSON.stringify({
			ok: true,
			message: 'Вы успешно зарегистрировались!',
			userData: user,
			checkNumber,
		})
	}
}

export const login = ({ email, password }) => {
	const users = getUsers()
	const user = isIssetUser(users, email)
	const checkNumber = getCheckNumber()

	if (!user || (user && user.password !== password)) {
		return JSON.stringify({
			ok: false,
			message: 'Пользователь не найден',
		})
	}
	return JSON.stringify({
		ok: true,
		message: 'Пользователь найден',
		checkNumber,
		userData: user,
	})
}

export const checkUser = (data) => {
	const number = data.toString()
	const checkNumber = localStorage.getItem('checkNumber')
	if (checkNumber === number) {
		return JSON.stringify({
			ok: true,
			message: 'Вы успешно зашли в свой кабинет',
		})
	}
	return JSON.stringify({
		ok: false,
		message: 'У Вас нет прав доступа',
	})
}
