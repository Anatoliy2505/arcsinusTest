import { createSelector } from 'reselect'

export const authRootSelector = (state) => state['auth']

export const isAuthSelector = createSelector(
	authRootSelector,
	({ isAuth }) => Boolean(isAuth) || false
)

export const isCheckedSelector = createSelector(
	authRootSelector,
	({ isCheked }) => Boolean(isCheked) || false
)

export const userSelector = createSelector(authRootSelector, ({ userData }) =>
	userData ? userData : null
)

export const isLoadingSelector = createSelector(
	authRootSelector,
	({ isLoading }) => Boolean(isLoading) || false
)
