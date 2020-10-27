import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import { GithubContext } from "../context/github/githubContext"

export const Profile = ({match}) => {
	const {getUser, getRepos, loading, user /*repos*/} = useContext(GithubContext)
	const urlName = match.params.name

	useEffect(() => {
		getUser(urlName)
		getRepos(urlName)
		//eslint-disable-next-line
	}, [])

	const {
		name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists
	} =  user

	return (
		loading
		? <Loader/>
		: <>
			<Link to="/" className="btn btn-link">На главную</Link>
			<div className="card mb-4">
				<div className="card-body">
					<div className="row">
						<div className="col-sm-3 text-center">
							<img src={avatar_url} alt={name} style={{width: '100%'}}/>
							<h1>{name}</h1>
							{location && <p>Местоположение: {location}</p>}
						</div>
						<div className="col">
							{
								bio && <>
									<h3>BIO</h3>
									<p>{bio}</p>
								</>
							}
							<a href={html_url} target="_blank" rel="noreferrer" className="btn btn-dark">Открыть профиль</a>
							<ul>
								{login && <li>
									<strong>Username: </strong>{login}
								</li>}
							</ul>
							<ul>
								{company && <li>
									<strong>Company: </strong>{company}
								</li>}
							</ul>
							<ul>
								{blog && <li>
									<strong>Website: </strong>{blog}
								</li>}
							</ul>
							<div className="badge badge-primary">Подписчики: {followers}</div>
							<div className="badge badge-success">Подписан: {following}</div>
							<div className="badge badge-info">Репозитории: {public_repos}</div>
							<div className="badge badge-dark">Gists: {public_gists}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}