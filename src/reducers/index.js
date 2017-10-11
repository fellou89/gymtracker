import { combineReducers } from 'redux'

function firstName(state = '', action) {
  switch (action.type) {
  case 'UPDATE_FIRST':
    return action.firstName
  case 'SIGNOUT':
    return ''
  default:
    return state
  }
}

function lastName(state = '', action) {
  switch (action.type) {
  case 'UPDATE_LAST':
    return action.lastName
  case 'SIGNOUT':
    return ''
  default:
    return state
  }
}

function email(state = '', action) {
  switch (action.type) {
  case 'UPDATE_EMAIL':
    return action.email
  case 'SIGNOUT':
    return ''
  default:
    return state
  }
}

function password(state = '', action) {
  switch (action.type) {
  case 'UPDATE_PASSWORD':
    return action.password
  case 'SIGNOUT':
    return ''
  default:
    return state
  }
}

function confirmation(state = '', action) {
  switch (action.type) {
  case 'UPDATE_CONFIRMATION':
    return action.confirmation
  case 'SIGNOUT':
    return ''
  default:
    return state
  }
}

function signin(state = {error: '', loading: false}, action) {
  switch (action.type) {
  case 'SIGNIN_UPDATE':
    return {...state, error: '', loading: true}
  case 'SIGNIN_SUCCESS':
  case 'SIGNOUT':
    return {...state, error: '', loading: false}
  case 'SIGNIN_FAILURE':
    return {...state, error: action.error, loading: false}
  default:
    return state
  }
}

function posts(state = {username: '', message: '', posts: []}, action) {
  switch (action.type) {
  case 'MESSAGE_UPDATE':
    return {...state, message: action.message}
  case 'POST_MESSAGE':
    return {...state, username: action.username, message: ''}
  case 'POSTS_UPDATE':
    return {...state, posts: action.posts}
  default:
    return state
  }
}

function profile(state = {user: null}, action) {
  switch (action.type) {
  case 'USER_UPDATE':
    return {...state, user: action.user}
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

    } else { //action.left === 'close'
      return {left: false}
    }
  default:
    return state
  }
}

export default combineReducers({
  email,
  firstName,
  lastName,
  password,
  confirmation,
  signin,
  posts,
  profile,
  drawers,
})
