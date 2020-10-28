import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import { Repos } from "../components/Repos"
import { GithubContext } from "../context/github/githubContext"

export const Profile = ({match}) => {
	const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
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
							<img src={avatar_url} alt={name} style={{width: '100%'}} className="badge-pill"/>
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
							<a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">Открыть профиль</a>
							<ul className="list-group mb-2">
								{login && <li className="list-group-item d-flex justify-content-between align-items-center">
									<strong>Username: </strong>{login}
								</li>}
								{company && <li className="list-group-item d-flex justify-content-between align-items-center">
									<strong>Company: </strong>{company}
								</li>}
								{blog && <li className="list-group-item d-flex justify-content-between align-items-center">
									<strong>Website: </strong>
									<a href={blog} target="_blank" rel="noreferrer">{blog}</a>
								</li>}
							</ul>
							<ul className="list-group">
								<li className="list-group-item d-flex justify-content-between align-items-center">
									Подписчики: <span className="badge badge-primary badge-pill">{followers}</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									Подписан: <span className="badge badge-primary badge-pill">{following}</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									Репозитории: <span className="badge badge-primary badge-pill">{public_repos}</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									Gists: <span className="badge badge-primary badge-pill">{public_gists}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Repos repos={repos}/>
		</>
	)
}