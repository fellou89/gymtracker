export function updateEmail(email) {
  return {
    type: 'UPDATE_EMAIL',
    email,
  }
}

export function updateFirstName(firstName) {
  return {
    type: 'UPDATE_FIRST',
    firstName,
  }
}

export function updateLastName(lastName) {
  return {
    type: 'UPDATE_LAST',
    lastName,
  }
}

export function updatePassword(password) {
  return {
    type: 'UPDATE_PASSWORD',
    password,
  }
}

export function updateConfirmation(confirmation) {
  return {
    type: 'UPDATE_CONFIRMATION',
    confirmation,
  }
}

export function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    user
  }
}

export function signinSuccess() {
  return {
    type: 'SIGNIN_SUCCESS',
  }
}

export function signinFail(error) {
  return {
    type: 'SIGNIN_FAILURE',
    error,
  }
}

export function updateMessage(message) {
  return {
    type: 'UPDATE_MESSAGE',
    message,
  }
}

export function postMessage(message) {
  return {
    type: 'POST_MESSAGE',
    message,
  }
}

export function updateDrawers(left) {
  return { 
    type: 'LEFT_TOGGLE',
    left
  }
}

export function updatePosts(posts) {
  return { 
    type: 'UPDATE_POSTS',
    posts
  }
}

export function selectGroup(name) {
  return { 
    type: 'SELECT_GROUP',
    name
  }
}

export function updateGroupName(name) {
  return { 
    type: 'UPDATE_GROUP_NAME',
    name
  }
}

export function groupNameError() {
  return { 
    type: 'GROUP_NAME_ERROR',
  }
}

export function signout() {
  return {
    type: 'SIGNOUT',
  }
}


