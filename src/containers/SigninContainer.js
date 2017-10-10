import firebase from 'firebase'
import { reset } from '../services/navigator.js'

import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateUser, signinFail} from '../actions'

const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  error: state.signin.error,
  loading: state.signin.loading
})

const mapDispatchToProps = (dispatch) => ({
  onEmailUpdate: (value) => {
    dispatch(updateEmail(value))
  },
  onPasswordUpdate: (value) => {
    dispatch(updatePassword(value))
  },
  onSignin: ({email, password}) => {
    dispatch({type: 'SIGNIN_UPDATE'})
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => signinSuccess(dispatch, user, password))
      .catch((error) => {
        if (firebase.auth().currentUser) {
          // if user was logged in... put error up to see stack trace
          throw error
        } else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
              user.sendEmailVerification()
              signinSuccess(dispatch, user, password)
            })
            .catch((error) => signinFailure(dispatch, error.message))
        }
      })
  },
})

const signinSuccess = (dispatch, user, password) => {
  try {
    AsyncStorage.multiSet([['email', user.email],['password', password]])
  } catch (e) {
    console.log(e)
  }
  dispatch(updateUser(user))
  reset('Posts')
}

const signinFailure = (dispatch, error) => {
  dispatch(signinFail(error))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
