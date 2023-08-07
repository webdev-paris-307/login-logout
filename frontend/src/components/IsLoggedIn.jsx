import React from "react"
import { Navigate } from "react-router-dom"

function IsLoggedIn({ user, children }) {
	/**
	 * IsLoggedIn receive:
	 * - user (which can be null or a user)
	 * - children which is the Favorites component.
	 * If I don't have a user, I want to redirect the client to the homepage or login/signup pages
	 * Else I will just display the children component (Favorites)
	 */
	if (!user) {
		return <Navigate to={"/"} />
	}
	return children
}

export default IsLoggedIn
