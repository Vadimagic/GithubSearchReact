import { useContext, useState } from "react"
import { AlertContext } from "../context/alert/alertContext"
import { GithubContext } from "../context/github/githubContext"

export const Search = () => {
	const [value, setValue] = useState('')
	const {show, hide} = useContext(AlertContext)
	const github = useContext(GithubContext)
	
	const onSubmit = event => {
		if (event.key !== 'Enter') {
			return
		}

		if (value.trim()) {
			hide()
			github.searchName(value.trim())
		} else {
			github.clearUsers()
			show('Введите данные пользователя')
		}
	}

	if (github.error) {
		show('Произошла ошибка')
		github.clearUsers()
	}

	return (
		<div className="form-group">
			<input 
				type="text"
				className="form-control"
				placeholder="Введите ник пользователя..."
				value={value}
				onChange={event => setValue(event.target.value)}
				onKeyPress={onSubmit}
			/>
		</div>
	)
}