import {useReducer} from 'react'
import axios from 'axios'
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING, OFF_LOADING, SCROLL_USERS, SCROLL_END } from '../types'
import { GithubContext } from './githubContext'
import { githubReducer } from './githubReducer'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const withCreds = url => {
	return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

const pages = 30;

export const GithubState = ({children}) => {
	const initialState = {
		search: '',
		user: {},
		users: [],
		loading: false,
		repos: [],
		scrollPage: 2,
		end: true
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	const searchName = async value => {
		setLoading()

		const response = await axios.get(
			withCreds(`https://api.github.com/search/users?q=${value}&per_page=${pages}&`)
		)

		dispatch({
			type: SEARCH_USERS,
			payload: response.data.items,
			search: value
		})

		if (response.data.items.length < pages) {
			dispatch({
				type: SCROLL_END
			})
		}
	}

	const scrollPage = async value => {
		setLoading()

		const response = await axios.get(
			withCreds(`https://api.github.com/search/users?q=${value}&per_page=${pages}&page=${state["scrollPage"]}&`)
		)

		if (response.data.items.length === 0) {
			dispatch({
				type: SCROLL_END
			})
		} else {
			let users = [...state.users, ...response.data.items]
			users = users.reduce((arr, user) => {
				if (arr.map[user.id]) {
					return arr
				}
				arr.map[user.id] = true;
				arr.users.push(user)
				return arr
			}, {map: {}, users: []}).users

			dispatch({
				type: SCROLL_USERS,
				payload: users
			})
		}

		
	}

	const getUser = async name => {
		setLoading()

		try {
			const response = await axios.get(
				withCreds(`https://api.github.com/users/${name}?`)
			)
			dispatch({
				type: GET_USER,
				payload: response.data
			})
		} catch (e) {
		}
	}

	const getRepos = async name => {
		setLoading()

		const response = await axios.get(
			withCreds(`https://api.github.com/users/${name}/repos?per_page=30&`)
		)

		dispatch({
			type: GET_REPOS,
			payload: response.data
		})
	}

	const clearUsers = () => dispatch({type: CLEAR_USERS})

	const setLoading = () => dispatch({type: SET_LOADING})

	const offLoading = () => dispatch({type: OFF_LOADING})

	const {user, users, repos, loading, search, end} = state

	return (
		<GithubContext.Provider value={{
			searchName, getUser, getRepos, clearUsers, setLoading, offLoading,	scrollPage,
			user, users, repos, loading, search, end
		}}>
			{children}
		</GithubContext.Provider>
	)
}