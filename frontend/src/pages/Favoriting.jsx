import { useState, useEffect } from "react"
import axios from "axios"

function Favoriting({ user }) {
	/**
	 * All the fruits in my db
	 */
	const [fruits, setFruits] = useState(null)
	/**
	 * All of the favorites of the loggedin user
	 */
	const [userFavorites, setUserFavorites] = useState(null)

	/**
	 * Shortcut function with inline await
	 */
	const fetchFruits = async () =>
		setFruits((await axios.get("http://localhost:3000/fruits")).data)
	/**
	 * Get all of our user favorites
	 * Here is the shape of a favorite
	 * {
	 * 		id: number,
	 *    fruitId: number (the id of a fruit),
	 * 		userId: number (the id of a user)
	 * }
	 */
	const fetchFavorites = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/favorites?userId=${user.id}`
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
				// Here is the small bad line that I could not process for some time.
				// The idea is pretty straightforward, findout if the current fruit is a favourite
				// by finding it in the userFavorites array.
				// If it is a favorite, render the button allowing the user to un-fav
				// The opposite in the other case
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
