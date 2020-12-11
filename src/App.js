import React from 'react'
import { Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { NotFound } from './pages'
import { PrivateRoute, RouteWithTitle } from './hocs'
import { routes } from './routes'
import { Footer, Header } from './components'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
	const routesSwitch = () => {
		if (routes.length === 0) {
			return null
		}
		return (
			<Switch>
				{routes.map(({ isPrivate, path, title, component, isExact }) =>
					!isPrivate ? (
						<RouteWithTitle
							key={path}
							exact={isExact}
							path={path}
							title={title}
							component={component}
						/>
					) : (
						<PrivateRoute
							key={path}
							exact={isExact}
							path={path}
							title={title}
							component={component}
						/>
					)
				)}
				<NotFound />
			</Switch>
		)
	}
	return (
		<div className="App">
			<Header />
			<main className="main">
				{routesSwitch()}
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
				/>
			</main>
			<Footer />
		</div>
	)
}
