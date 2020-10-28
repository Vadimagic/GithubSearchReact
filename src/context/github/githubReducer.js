import { CLEAR_USERS, GET_REPOS, GET_USER, OFF_LOADING, SCROLL_USERS, SEARCH_USERS, SET_LOADING } from "../types"

const handlers = {
	[SEARCH_USERS]: (state, {payload, search}) => ({...state, users: payload, loading: false, search, scrollPage: 2}),
	[GET_REPOS]: (state, {payload}) => ({...state, repos: payload, loading: false}),
	[GET_USER]: (state, {payload}) => ({...state, user: payload, loading: false}),
	[SET_LOADING]: state => ({...state, loading: true}),
	[CLEAR_USERS]: state => ({...state, users: []}),
	[OFF_LOADING]: state => ({...state, loading: false}),
	[SCROLL_USERS]: (state, {payload}) => ({...state, users: payload, scrollPage: state.scrollPage + 1, loading: false}),
	DEFAULT: state => state
}

export const githubReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT
	return handler(state, action)
}