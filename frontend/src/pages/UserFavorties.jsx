import { useState, useEffect } from "react"
import axios from "axios"
function UserFavorties() {
	const [favorites, setFavorites] = useState(null)

	const fetchFavorites = async () => {
		try {
			const res = await axios.get(
				`http://localhost:3000/favorites?userId=${
					JSON.parse(localStorage.getItem("user")).id
				}&_expand=fruit`
			)
			console.log(res.data)
			setFavorites(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	async function removeFav(favId) {
		try {
			await axios.delete(`http://localhost:3000/favorites/${favId}`)
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchFavorites()
	}, [])
	if (!favorites) return <p>No favorites.</p>
	return (
		<div>
			{favorites.map((fav) => {
				return (
					<p>
						{fav.fruit.name}{" "}
						<button onClick={() => removeFav(fav.id)}>Delete</button>
					</p>
				)
			})}
		</div>
	)
}

export default UserFavorties
