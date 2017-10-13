import firebase from 'firebase'
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
  case 'UPDATE_SIGNIN':
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

function createGroup(state = {name: '', error: ''}, action) {
  switch (action.type) {
  case 'UPDATE_GROUP_NAME':
    return {...state, name: action.name}
  case 'GROUP_NAME_ERROR':
    return {...state, error: 'Name is already used'}
  case 'SIGNOUT':
    return {...state, name: '', error: ''}
  default:
    return state
  }
}

function posts(state = {message: '', posts: []}, action) {
  switch (action.type) {
  case 'UPDATE_MESSAGE':
    return {...state, message: action.message}
  case 'POST_MESSAGE':
    return {...state, message: ''}
  case 'UPDATE_POSTS':
    return {...state, posts: action.posts}
  case 'SIGNOUT':
    return {...state, message: '', posts: []}
  default:
    return state
  }
}

function profile(state = {user: {mygroups: []}, selected: ''}, action) {
  switch (action.type) {
  case 'UPDATE_USER':
    const groups = (typeof action.user.mygroups == 'undefined') ? [] : Object.values(action.user.mygroups)
    action.user.mygroups = groups
    return {...state, user: action.user, selected: ((groups.length == 0) ? '' : groups[0].name)}

  case 'SELECT_GROUP':
    return {...state, selected: action.name}

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
  createGroup,
  profile,
  drawers,
})
