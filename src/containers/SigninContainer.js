import firebase from 'firebase'
import { navigate } from '../services/navigator.js'
import { updateUserService } from '../services/data.js'

import { connect } from 'react-redux'
import { updateEmail, updatePassword } from '../actions'

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
    dispatch({type: 'UPDATE_SIGNIN'})
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {

        // moves flow into Posts
        updateUserService(email, password, dispatch)
      })
      .catch((error) => {
        if (!firebase.auth().currentUser) {
          navigate('Signup')

        } else {
          // user was logged in, but errors will be caught here and stack trace won't pop up, so throw error
          // TODO: this could handle all unexpected crashes gracefully, right?
          throw error
        }
      })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)
