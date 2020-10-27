import { useContext } from "react"
import { Card } from "../components/Card"
import Loader from "../components/Loader"
import { Search } from "../components/Search"
import { GithubContext } from "../context/github/githubContext"

export const Home = () => {
	const {loading, users} = useContext(GithubContext)

	console.log(users)

	return (
		<>
			<Search />

			<div className="row">

				{
					loading
					? <Loader />
					: users.map( user => (
							<div className="col-sm-4 mb-4" key={user.id}>
								<Card user={user}/>
							</div>
						))
				}
				
			</div>
			
		</>
	)
}