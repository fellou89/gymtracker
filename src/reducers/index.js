import { combineReducers } from 'redux'

function email(state = '', action) {
  switch (action.type) {
  case 'UPDATE_EMAIL':
    return action.email
  default:
    return state
  }
}

function password(state = '', action) {
  switch (action.type) {
  case 'UPDATE_PASSWORD':
    return action.password
  default:
    return state
  }
}

function signin(state = {user: null, error: '', loading: false}, action) {
  switch (action.type) {
  case 'SIGNIN_UPDATE':
    return {...state, error: '', loading: true}
  case 'SIGNIN_SUCCESS':
    return {...state, user: action.user, loading: false}
  case 'SIGNIN_FAILURE':
    return {...state, error: action.error, loading: false}
  default:
    return state
  }
}

function posts(state = {user: '', message: '', posts: []}, action) {
  switch (action.type) {
  case 'MESSAGE_UPDATE':
    return {...state, message: action.message}
  case 'POST_MESSAGE':
    return {...state, user: action.user, message: ''}
  case 'POSTS_UPDATE':
    return {...state, posts: action.posts}
  default:
    return state
  }
}

function drawers(state = {left: false}, action) {
  switch (action.type) {
  case 'LEFT_TOGGLE':
    if (action.left === 'toggle') {
      return {left: !state.left}

    } else if (action.left === 'open') {
      return {left: true}

    } else {
      return {left: false}
    }
  default:
    return state
  }
}

export default combineReducers({
  email,
  password,
  signin,
  posts,
  drawers
})
