import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function LoginPage({ storeUser }) {
	const [user, setUser] = useState({ username: "", email: "", password: "" })
	const [error, setError] = useState("")
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await axios.get(
				`http://localhost:3000/users?username=${user.username}&email=${user.email}&password=${user.password}`
			)
			if (!response.data.length) {
				throw new Error("Could not find the user")
			}
			const foundUser = response.data[0]
			console.log(foundUser)
			delete foundUser.password
			storeUser(foundUser)
			navigate("/")
		} catch (error) {
			setError(error.message)
			setTimeout(() => {
				setError("")
			}, 4000)
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={user.username}
						id="username"
						onChange={(e) =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="email">E-mail: </label>
					<input
						type="email"
						id="email"
						value={user.email}
						onChange={(e) =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						id="password"
						value={user.password}
						onChange={(e) =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
					/>
				</div>
				<p className="error">{error}</p>
				<button>Login</button>
			</form>
		</div>
	)
}

export default LoginPage
