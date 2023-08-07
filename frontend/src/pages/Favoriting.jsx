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
				`http://localhost:3000/favorites?userId=${user.id}&_expand=fruit`
			)
			console.log(response.data)
			setUserFavorites(response.data)
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
			fetchFavorites()
		} catch (error) {
			console.log(error.message)
		}
	}

	async function removeFavorites(favoriteId) {
		try {
			await axios.delete("http://localhost:3000/favorites/" + favoriteId)
			fetchFavorites()
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
			{fruits.map((fruit) => {
				const isFav = userFavorites.find((fav) => fav.fruitId === fruit.id)
				return (
					<p key={fruit.id}>
						{fruit.name}{" "}
						{isFav ? (
							<button onClick={() => removeFavorites(isFav.id)}>❤️</button>
						) : (
							<button onClick={() => addToFavorites(fruit.id)}>💔</button>
						)}
					</p>
				)
			})}
		</div>
	)
}

export default Favoriting
