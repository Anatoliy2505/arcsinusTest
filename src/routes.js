import { Auth, Profile, CheckUser } from './pages'

export const routes = [
	{
		path: '/profile',
		title: 'Профиль',
		component: Profile,
		isPrivate: true,
		isExact: true,
	},
	{
		path: '/check',
		title: 'Введите код',
		component: CheckUser,
		isExact: true,
	},

	{
		path: ['/login', '/registration', '/'],
		title: 'Авторизация | Регистрация',
		component: Auth,
	},
]
