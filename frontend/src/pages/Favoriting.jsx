import { useState, useEffect } from "react"
import axios from "axios"

function Favoriting({ user }) {
	const [fruits, setFruits] = useState(null)
	const [userFavorites, setUserFavorites] = useState(null)
	const fetchFruits = async () =>
		setFruits((await axios.get("http://localhost:3000/fruits")).data)
	const fetchFavorites = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/favorites?userId=${user.id}`
			)
			setUserFavorites(response.data.map((fav) => fav.fruitId))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchFruits()
		fetchFavorites()
	}, [])

	async function addToFavorites(fruitId) {
		try {
			const newFavorite = {
				userId: user.id,
				fruitId: fruitId,
			}
			await axios.post("http://localhost:3000/favorites", newFavorite)
		} catch (error) {
			console.log(error.message)
		}
	}

	if (!fruits || !userFavorites) {
		return <p>No fruits to display...</p>
	}

	return (
		<div>
			<h2>Favoriting</h2>
			{fruits.map((fruit) => (
				<p key={fruit.id}>
					{fruit.name}{" "}
					<button onClick={() => addToFavorites(fruit.id)}>
						{userFavorites.includes(fruit.id) ? "❤️" : "💔"}
					</button>{" "}
				</p>
			))}
		</div>
	)
}

export default Favoriting
