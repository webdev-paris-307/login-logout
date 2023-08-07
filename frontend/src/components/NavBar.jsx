import React from "react"
import { NavLink } from "react-router-dom"
function NavBar({ removeUser }) {
	const user = JSON.parse(localStorage.getItem("user"))

	return (
		<nav>
			<NavLink to={"/"}>Home</NavLink>
			<NavLink to={"/stuff"}>Things with arrays and fav's</NavLink>
			{!user && (
				<>
					<NavLink to={"/signup"}>Signup</NavLink>
					<NavLink to={"/login"}>Login</NavLink>
				</>
			)}
			{user && <button onClick={removeUser}>Logout</button>}
		</nav>
	)
}

export default NavBar
