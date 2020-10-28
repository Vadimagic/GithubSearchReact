import { Link } from "react-router-dom"

export const About = () => {
	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<h1 className="display-4">Информация</h1>
				<p className="lead">Это простоe SPA написанное на React.<br/> Сайт получает данные о пользователях с сайта GitHub и показывает в удобном формате информацию о них</p>
				<hr className="my-4"/>
				<p className="lead">Версия приложения <strong>1.0.0</strong></p>
				<p className="lead">
					<Link className="btn btn-primary btn-lg" to="/profile/Vadimagic">Мой GitHub</Link>
				</p>
			</div>
		</div>
	)
}