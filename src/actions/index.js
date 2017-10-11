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
    type: 'USER_UPDATE',
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
    type: 'MESSAGE_UPDATE',
    message,
  }
}

export function postMessage(message, username) {
  return {
    type: 'POST_MESSAGE',
    message,
    username
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
    type: 'POSTS_UPDATE',
    posts
  }
}

export function signout() {
  return {
    type: 'SIGNOUT',
  }
}


