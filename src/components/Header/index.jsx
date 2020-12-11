import React from 'react'

import './Header.scss'

export const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<h1 className="header-title">
					Web <span className="header-title__decorator">App</span>
				</h1>
			</div>
		</header>
	)
}
