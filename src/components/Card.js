import { Link } from "react-router-dom";

export const Card = ({avatarUrl, nodeId, login}) => (
	<div className="card">
		<img src={avatarUrl} alt={login} className='card-img-top'/>
		<div className="card-body">
			<h5 className="card-title">{login}</h5>
			<Link to={'/profile/' + nodeId} className="btn btn-primary">Открыть</Link>
		</div>
	</div>
)