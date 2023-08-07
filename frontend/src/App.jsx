import "./App.css"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Favoriting from "./pages/Favoriting"
import UserFavorties from "./pages/UserFavorties"
import { useState, useEffect } from "react"

function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

	function storeUser(userArg) {
		setUser(userArg)
		localStorage.setItem("user", JSON.stringify(userArg))
	}

	function removeUser() {
		setUser(null)
		localStorage.removeItem("user")
	}

	return (
		<>
			<NavBar removeUser={removeUser} />
			{user && <h1>Welcome {user.username}!</h1>}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage storeUser={storeUser} />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/stuff" element={<Favoriting user={user} />} />
				<Route path="/user-favorites" element={<UserFavorties />} />
			</Routes>
		</>
	)
}

export default App
