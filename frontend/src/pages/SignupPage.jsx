import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function SignupPage() {
	const [user, setUser] = useState({ username: "", email: "", password: "" })
	const [error, setError] = useState("")
	const navigate = useNavigate()

	/**
	 * In this handlesubmit, we create a new user in the backend by doing a post request.
	 * Then we navigate the user to the /login page
	 */
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			// const createdUser = {
			// 	username: user.username,
			// 	password: user.password,
			// 	email: user.email,
			// }
			await axios.post("http://localhost:3000/users", user)
			navigate("/login")
		} catch (error) {
			setError(error.message)
			setTimeout(() => {
				setError("")
			}, 4000)
		}
	}
	return (
		<div>
			<h2>Signup</h2>
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
				<button>Signup</button>
			</form>
		</div>
	)
}

export default SignupPage
