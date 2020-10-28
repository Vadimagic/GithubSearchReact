import { useContext } from "react"
import { Card } from "../components/Card"
import Loader from "../components/Loader"
import { Search } from "../components/Search"
import { GithubContext } from "../context/github/githubContext"
import InfiniteScroll from "react-infinite-scroll-component"

export const Home = () => {
	const {loading, users, scrollPage} = useContext(GithubContext)

	return (
		<>
			<Search />
			
			{
				(users[0] || loading)
				&& <InfiniteScroll
						dataLength={users.length}
						next={scrollPage}
						hasMore={true}
						loader={<Loader />}
						scrollThreshold	= "50px"
					>
						<div className="row">
							{users.map( user => (
								<div className="col-sm-4 mb-4" key={user.id}>
									<Card user={user}/>
								</div>
							))}
						</div>
					</InfiniteScroll>
			}
		</>
	)
}