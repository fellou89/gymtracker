export function updateEmail(email) {
  return {
    type: 'UPDATE_EMAIL',
    email,
  }
}

export function updatePassword(password) {
  return {
    type: 'UPDATE_PASSWORD',
    password,
  }
}

export function updateUser(user) {
  return {
    type: 'SIGNIN_SUCCESS',
    user,
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

export function postMessage(message, user) {
  return {
    type: 'POST_MESSAGE',
    message,
    user
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
